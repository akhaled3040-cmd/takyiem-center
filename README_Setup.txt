TAKYIEM CALL CENTER DASHBOARD — NEW PROJECT

This is a NEW project. It is not connected to or dependent on the older ahmedkhaled repository.

Files
- index.html: Dashboard UI (Apps Script HTML file name must be exactly "index")
- Code.gs: Google Apps Script backend connected to the new Google Sheet ID
- README_Setup.txt: setup and deployment notes

Data source
Spreadsheet ID: 1O02FcTdZlkowogObQ9uFn2rHhcNzroC17h2GQOJzh0A

Expected tabs:
- Interested
- Inquiries
- Booking Not Completed

Expected structure:
- Row 2 contains headers
- Data starts on row 3
- A Customer Name
- B Phone Number
- C Visit Date
- D Lead Source
- E Recorded By
- F Original Status
- G Notes

Privacy / hosting architecture
Do not publish the customer spreadsheet as "Anyone with the link".
Do not put customer data or Google credentials in GitHub.
GitHub is used as a private source-code repository.
The secure live dashboard is served by a Google Apps Script Web App. Deploy it so only the intended signed-in Google accounts can access it, and ensure each viewer has the required spreadsheet permissions.
A static GitHub Pages page cannot securely read a private Google Sheet by itself without a properly authenticated backend. Therefore this package uses Apps Script as the live application host, while GitHub stores the source files.

Setup
1. Create a NEW, separate GitHub repository named TAKYIEM-CALL-CENTER-DASHBOARD. Do not use the old ahmedkhaled repository.
2. Upload index.html, Code.gs, and this README to the new repository. Keep repository private if available.
3. Open script.google.com and create a NEW standalone Apps Script project.
4. Add Code.gs and an HTML file named exactly index (lowercase; Apps Script displays index.html).
5. Paste the matching file contents and save.
6. Run getDashboardData once and authorize Google Sheets access with the Google account that can access the spreadsheet.
7. Deploy > New deployment > Web app.
8. Execute as: User accessing the web app (preferred where all viewers have sheet access). Restrict access to the intended signed-in users / organization. Do not choose Anyone.
9. Test using an authorized manager account and confirm all three tabs load.
10. The dashboard refreshes automatically every 60 seconds.

Management labels shown in the dashboard:
PREPARED FOR MR ABDEL HADY ELBAMBY — CEO
MR YASSER ALI — MANAGER
PREPARED BY AHMED KHALED

Important
- Phone numbers are read using display values to preserve visible international formatting.
- The dashboard is read-only; it does not edit the source spreadsheet.
