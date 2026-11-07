<?php
// Copy this file to config.php (same folder) and fill in your values.
// config.php is never shown to visitors: PHP runs it instead of displaying it.
return [
  // Where lead emails go
  'LEAD_TO' => 'tayyab@influencerorbit.com',
  // Must be a mailbox on influencerorbit.com so Hostinger will send it
  'MAIL_FROM' => 'tayyab@influencerorbit.com',
  // MailerLite: Integrations → API → Generate new token. Leave empty to skip MailerLite.
  'MAILERLITE_API_KEY' => '',
  // Optional: MailerLite group IDs. Leave empty and the groups
  // "Audit requests", "Playbook downloads", "Website enquiries" and "Newsletter" are found or created by name.
  'GROUPS' => ['audit' => '', 'playbook' => '', 'contact' => '', 'newsletter' => ''],
];
