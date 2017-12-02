//
//
// curl -v -u ruman@olivetheory.com:welcome2OTH2017 -H "Content-Type: application/json" -d '{
// "name":"Ritesh Vishwakarma",
// "email": "tom@outerspace.com",
// "description": "Test...",
// "custom_fields":{
//       "utm_source":"mum-shopper-common",
//       "utm_content":"video",
//       "utm_medium":"cpc",
//       "utm_term":"video1",
//       "utm_campaign":"conversion-olive-theory",
//       "mobile" : "9831816668",
//       "image" : "https://d2c6eb9ycutf9w.cloudfront.net/social/1507792220497_17956DC0-F305-4063-B0B6-C8E5ECBDDB4A.png",
//       "city" : "Kolkata",
//       "ticket_source":"GIM"
//   },"type":"Lead",
//  "subject": "Please Ignore and delete...",  "priority": 1, "status": 2, "cc_emails": ["ram@freshdesk.com","diana@freshdesk.com"] }' -X POST 'https://olivetheory.freshdesk.com/api/v2/tickets'
//
//
// http://getitmade.olivetheory.com/?utm_source=mum-shopper-common&utm_content=video&utm_medium=cpc&utm_term=video1&utm_campaign=conversion-olive-theory
//
// {
// "utm_source":'mum-shopper-common',
// "utm_content":"video",
// "utm_medium":"cpc",
// "utm_term":"video1",
// "utm_campaign":"conversion-olive-theory",
//
//   "mobile" : "9831816668",
//   "image" : "https://d2c6eb9ycutf9w.cloudfront.net/social/1507792220497_17956DC0-F305-4063-B0B6-C8E5ECBDDB4A.png",
//   "city" : "Kolkata"
// }
// name	string	Name of the requester
// email
// MANDATORY
// string	Email address of the requester. If no contact exists with this email address in Freshdesk, it will be added as a new contact.
// subject
// MANDATORY
// string	Subject of the ticket. The default Value is null.
// type	string	Helps categorize the ticket according to the different kinds of issues your support team deals with. The default Value is null.
// status *	number	Status of the ticket. The default Value is 5.
// priority *	number	Priority of the ticket. The default value is 1.
// description	string	HTML content of the ticket.
// attachments	array of objects	Ticket attachments. The total size of these attachments cannot exceed 15MB.
// custom_fields	dictionary	Key value pairs containing the names and values of custom fields. Read more here
// due_by	datetime	Timestamp that denotes when the ticket is due to be resolved
// email_config_id
// MANDATORY
// number	ID of email config which is used for this ticket. (i.e., support@yourcompany.com/sales@yourcompany.com)
// fr_due_by	datetime	Timestamp that denotes when the first response is due
// group_id	number	ID of the group to which the ticket has been assigned. The default value is the ID of the group that is associated with the given email_config_id
// tags

var sampledata={
  "description": "Test...",
  "custom_fields": {
    "utm_source": "mum-shopper-common",
    "utm_content": "video",
    "utm_medium": "cpc",
    "utm_term": "video1",
    "utm_campaign": "conversion-olive-theory",
    "mobile": "9831816668",
    "image": "https://d2c6eb9ycutf9w.cloudfront.net/social/1507792220497_17956DC0-F305-4063-B0B6-C8E5ECBDDB4A.png",
    "city": "Kolkata",
    "ticket_source": "GIM"
  },
  "type": "Lead",
  "subject": "Please Ignore and delete...",
  "email": "tom@outerspace.com",
  "priority": 1,
  "status": 2,
  "cc_emails": [
    "ram@freshdesk.com",
    "diana@freshdesk.com"
  ]
}
