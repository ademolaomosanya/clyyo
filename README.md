# clyyo
Hi i'm building Clyyo, an event management platform with  team matching, QR check-in, and organizer analytics basically for hackathon and conferences. 

The following diagram shows Clyyo's System Design(subject to change and get improved as i build):
#
<img width="1245" height="1240" alt="diagram-export-30-06-2026-14_22_37" src="https://github.com/user-attachments/assets/eaddcfdc-2599-4400-be0d-65e496dedc63" />
<img width="1571" height="1001" alt="ChatGPT Image Jun 30, 2026, 02_35_52 PM" src="https://github.com/user-attachments/assets/6a48a9dd-d2a6-4a9f-8bae-3399b09d1574" />

# Roles
Users roles below, using NextAuth.js for authetication.


| Role      | Main job                                                         |
| --------- | ---------------------------------------------------------------- |
| Attendee  | Register, join team(Incase of Hackathon), check in, Participate. |
| Organizer | Create events, review applications, manage teams/check-in/grants |
| Sponsor   | View sponsored events, leads, visibility, analytics              |
| Admin     | Manage whole Clyyo platform                                      |

