
# LibTrack — High-level flow

This repository contains a simple library access tracking system. Below is a high-level flow diagram showing how students, hostel staff, and librarians interact with the system and how data is stored in the MySQL database.

If your viewer supports Mermaid diagrams (GitHub, many editors with Mermaid plugins), the diagram below will render visually. An ASCII fallback is provided for viewers that don't render Mermaid.

```mermaid
flowchart TB
	subgraph Student["Student Dashboard"]
		SD1["Request Library"]
		SD2["View Status"]
	end

	subgraph Hostel["Hostel Dashboard"]
		HD1["Approve/Reject"]
		HD2["View Logs"]
	end

	subgraph Librarian["Librarian Dashboard"]
		LD1["View Approved Students"]
		LD2["Mark Entry Time"]
		LD3["Mark Exit Time"]
	end

	subgraph DB["MySQL Database"]
		DBU["Users (student, hostel, librarian)"]
		DBR["Requests"]
		DBL["Logs (entry/exit)"]
	end

	Student -->|Request Permission| Hostel
	Hostel -->|Approved?| Decision{Approved?}
	Decision -- Yes --> Approved["Student Notified of Approval"]
	Decision -- No  --> Rejected["Student Notified of Rejection"]

	Approved --> Librarian
	Librarian --> DB
	DB --> Hostel

	%% Styling helpers (optional)
	style Student fill:#f9f,stroke:#333,stroke-width:1px
	style Hostel fill:#ff9,stroke:#333,stroke-width:1px
	style Librarian fill:#9ff,stroke:#333,stroke-width:1px
	style DB fill:#eee,stroke:#333,stroke-width:1px
```

ASCII fallback:

		+-------------------+
		|                   |
		|   Student Dashboard|
		|                   |
		|  - Request Library |
		|  - View Status     |
		+---------+---------+
							|
							| Request Permission
							v
		+-------------------+
		|                   |
		|  Hostel Dashboard |
		|                   |
		|  - Approve/Reject |
		|  - View Logs      |
		+---------+---------+
							|
 Approved?  Yes       |       No
						+---------+---------+
						v                   v
	 +----------------+     +----------------+
	 | Student Notified|     | Student Notified
	 | of Approval     |     | of Rejection   |
	 +----------------+     +----------------+
						|
						v
	 +-------------------+
	 |                   |
	 | Librarian Dashboard|
	 |                   |
	 | - View Approved    |
	 |   Students         |
	 | - Mark Entry Time  |
	 | - Mark Exit Time   |
	 +---------+---------+
						 |
						 v
	 +------------------------+
	 |                        |
	 |   MySQL Database       |
	 |                        |
	 | - Users (student,      |
	 |   hostel, librarian)   |
	 | - Requests             |
	 | - Logs (entry/exit)    |
	 +------------------------+
						 |
						 v
	 +-------------------+
	 |                   |
	 | Hostel Dashboard  |
	 |                   |
	 | - Receives Exit   |
	 |   Time Notification|
	 | - Verify Physical |
	 |   Return           |
	 +-------------------+

Notes:
- The MySQL database stores users, requests and entry/exit logs.
- Hostel staff first approve or reject a student's request. On approval the librarian handles the physical entry/exit tracking.

Want this exported as a PNG/SVG or added as a diagram file? I can generate that next.

