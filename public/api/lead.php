<?php
/**
 * Influencer Orbit lead handler (Hostinger).
 * 1. Validates the form and blocks obvious spam.
 * 2. Emails the lead to LEAD_TO (works with no setup).
 * 3. Appends it to a private CSV backup outside public_html.
 * 4. If MAILERLITE_API_KEY is set in config.php, adds the subscriber to the right MailerLite group.
 */
declare(strict_types=1);

$config = ['LEAD_TO' => 'tayyab@influencerorbit.com', 'MAIL_FROM' => 'tayyab@influencerorbit.com', 'MAILERLITE_API_KEY' => '', 'GROUPS' => []];
if (is_file(__DIR__ . '/config.php')) { $config = array_merge($config, (array) require __DIR__ . '/config.php'); }

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;
function reply(bool $ok, string $msg, bool $json, int $code = 200): void {
  http_response_code($code);
  if ($json) { header('Content-Type: application/json; charset=utf-8'); echo json_encode(['ok' => $ok, 'message' => $msg]); }
  else { header('Location: ' . ($ok ? '/thank-you' : '/book'), true, 303); }
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(false, 'Method not allowed', $wantsJson, 405);

// Same-site posts only
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !preg_match('#^https?://(www\.)?influencerorbit\.com$#i', $origin) && !preg_match('#^http://localhost(:\d+)?$#', $origin)) {
  reply(false, 'Bad origin', $wantsJson, 403);
}

$f = $_POST['fields'] ?? [];
if (!is_array($f)) $f = [];
$type = in_array($_POST['form'] ?? '', ['audit', 'playbook', 'contact', 'newsletter'], true) ? $_POST['form'] : 'contact';
$clean = static fn($v, int $max = 500): string => trim(mb_substr(str_replace(["\r", "\0"], '', strip_tags((string) $v)), 0, $max));

$lead = [
  'name' => $clean($f['name'] ?? '', 120),
  'email' => $clean($f['email'] ?? '', 200),
  'website' => $clean($f['website'] ?? '', 300),
  'revenue' => $clean($f['revenue'] ?? '', 60),
  'creator_posts' => $clean($f['creator_posts'] ?? '', 60),
  'competitors' => $clean($f['competitors'] ?? '', 400),
  'problem' => $clean($f['problem'] ?? '', 2000),
];

// Spam: honeypot filled, or submitted faster than 3 seconds after page load
$started = (int) ($_POST['ts'] ?? 0);
if (($_POST['company_url'] ?? '') !== '' || ($started > 0 && (time() * 1000 - $started) < 3000)) reply(true, 'Thanks', $wantsJson);

if (!filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) reply(false, 'Please add a valid email.', $wantsJson, 422);
if ($type !== 'newsletter' && $lead['name'] === '') reply(false, 'Please add your name.', $wantsJson, 422);
if (!in_array($type, ['playbook', 'newsletter'], true) && $lead['website'] === '') reply(false, 'Please add your brand website.', $wantsJson, 422);

// Simple rate limit: 5 submissions per IP per 10 minutes
$ip = $_SERVER['REMOTE_ADDR'] ?? '0';
$privateDir = dirname($_SERVER['DOCUMENT_ROOT'] ?: __DIR__ . '/..');
if (!is_writable($privateDir)) $privateDir = __DIR__ . '/data';
@mkdir($privateDir, 0750, true);
$rlFile = $privateDir . '/io-rate-' . md5($ip) . '.json';
$hits = array_filter((array) @json_decode((string) @file_get_contents($rlFile), true), fn($t) => $t > time() - 600);
if (count($hits) >= 5) reply(false, 'Too many submissions. Please email us instead.', $wantsJson, 429);
$hits[] = time(); @file_put_contents($rlFile, json_encode(array_values($hits)));

$labels = ['audit' => 'Competitor Creator Audit request', 'playbook' => 'Playbook download', 'contact' => 'Website enquiry', 'newsletter' => 'Newsletter signup'];
$when = gmdate('Y-m-d H:i') . ' UTC';

// 1. Private CSV backup
$csv = @fopen($privateDir . '/io-leads.csv', 'a');
if ($csv) { fputcsv($csv, array_merge([$when, $type], array_values($lead), [$ip])); fclose($csv); }

// 2. MailerLite (when a key is set)
$synced = false;
if ($config['MAILERLITE_API_KEY'] !== '' && function_exists('curl_init')) {
  $ml = static function (string $method, string $path, ?array $data = null) use ($config): array {
    $ch = curl_init('https://connect.mailerlite.com/api' . $path);
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 8, CURLOPT_CUSTOMREQUEST => $method,
      CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $config['MAILERLITE_API_KEY'], 'Content-Type: application/json', 'Accept: application/json']]);
    if ($data !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    $res = (string) curl_exec($ch); $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch);
    return [$code, (array) json_decode($res, true)];
  };
  $groupNames = ['audit' => 'Audit requests', 'playbook' => 'Playbook downloads', 'contact' => 'Website enquiries', 'newsletter' => 'Newsletter'];
  $groupId = $config['GROUPS'][$type] ?? '';
  if ($groupId === '') { // find or create the group by name
    [$c, $r] = $ml('GET', '/groups?limit=100&filter[name]=' . rawurlencode($groupNames[$type]));
    foreach (($r['data'] ?? []) as $g) if (($g['name'] ?? '') === $groupNames[$type]) $groupId = (string) $g['id'];
    if ($groupId === '') { [$c, $r] = $ml('POST', '/groups', ['name' => $groupNames[$type]]); $groupId = (string) ($r['data']['id'] ?? ''); }
  }
  // make sure custom fields exist (text)
  [$c, $r] = $ml('GET', '/fields?limit=100');
  $have = array_map(fn($x) => $x['key'] ?? '', $r['data'] ?? []);
  foreach (['website', 'revenue', 'creator_posts', 'competitors', 'problem'] as $key) {
    if ($c === 200 && !in_array($key, $have, true)) $ml('POST', '/fields', ['name' => ucfirst(str_replace('_', ' ', $key)), 'type' => 'text']);
  }
  $fields = array_filter(['name' => $lead['name'], 'website' => $lead['website'], 'revenue' => $lead['revenue'], 'creator_posts' => $lead['creator_posts'], 'competitors' => $lead['competitors'], 'problem' => $lead['problem']], fn($v) => $v !== '');
  [$c, $r] = $ml('POST', '/subscribers', array_filter(['email' => $lead['email'], 'fields' => $fields, 'groups' => $groupId !== '' ? [$groupId] : null]));
  $synced = $c >= 200 && $c < 300;
  if (!$synced) @file_put_contents($privateDir . '/io-mailerlite-errors.log', "$when $c " . json_encode($r) . "\n", FILE_APPEND);
}

// 3. Email to LEAD_TO. Newsletter signups are only emailed if MailerLite did not save them.
$body = $labels[$type] . " — $when\n\n";
foreach ($lead as $k => $v) if ($v !== '') $body .= ucfirst(str_replace('_', ' ', $k)) . ": $v\n";
$body .= "\nPage: " . $clean($_SERVER['HTTP_REFERER'] ?? '', 300) . "\n";
$headers = "From: Influencer Orbit Website <{$config['MAIL_FROM']}>\r\nReply-To: " . str_replace(["\n", "\r"], '', $lead['email']) . "\r\nContent-Type: text/plain; charset=utf-8";
$mailed = ($type === 'newsletter' && $synced) ? false : @mail($config['LEAD_TO'], '=?UTF-8?B?' . base64_encode($labels[$type] . ': ' . ($lead['name'] !== '' ? $lead['name'] : $lead['email'])) . '?=', $body, $headers);

// Success only if the lead reached your inbox or MailerLite. Otherwise the browser
// opens the visitor's email app addressed to you, so the lead still reaches you.
reply($mailed || $synced, $mailed || $synced ? 'Thanks' : 'Could not deliver', $wantsJson, $mailed || $synced ? 200 : 502);
