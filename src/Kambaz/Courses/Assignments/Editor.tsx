

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" type="text" value="A1 - ENV + HTML" readOnly />
      <br />
      <br />

      <textarea
  id="wd-description"
  rows={10} 
  cols={50} 
  defaultValue={`The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
/>

      <br />
      <br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" value={100} readOnly />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-grade-display">Display Grade as</label>
            </td>
            <td>
              <select id="wd-grade-display" defaultValue="Percentage">
                <option value="Percentage">Percentage</option>
                <option value="Points">Points</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission" defaultValue="Online">
                <option value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="No Submission">No Submission</option>
              </select>
              <div>
                <label>
                  <input type="checkbox" /> Text Entry
                </label>
                <br />
                <label>
                  <input type="checkbox" /> Website URL
                </label>
                <br />
                <label>
                  <input type="checkbox" /> Media Recordings
                </label>
                <br />
                <label>
                  <input type="checkbox" /> Student Annotation
                </label>
                <br />
                <label>
                  <input type="checkbox" /> File Uploads
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <input id="wd-available-from" type="date" defaultValue="2024-05-06" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-until">Until</label>
            </td>
            <td>
              <input id="wd-until" type="date" defaultValue="2024-05-20" />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
