// Google Apps Script — Sổ lưu bút + Xác nhận tham dự
// Paste toàn bộ file này vào Apps Script Editor → Save (Ctrl+S), rồi:
//   Deploy → Manage deployments → ✏️ (Edit) → Version: "New version" → Deploy
// (Phải chọn "New version" thì URL /exec cũ mới chạy code mới. Chỉ Save là KHÔNG đủ.)

const SHEET_NAME = 'Loi chuc'              // tab sổ lưu bút
const RSVP_SHEET_NAME = 'Xac nhan tham du' // tab xác nhận tham dự

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(['ID', 'Tên', 'Lời chúc', 'Thời gian'])
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold')
  }
  return sheet
}

// Tab riêng cho phần "Xác nhận tham dự"
function getRsvpSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(RSVP_SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(RSVP_SHEET_NAME)
    sheet.appendRow(['ID', 'Họ và tên', 'Tham dự', 'Lời nhắn', 'Thời gian'])
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold')
  }
  return sheet
}

// GET — trả về toàn bộ lời chúc (JSON)
function doGet(e) {
  const sheet = getSheet()
  const rows  = sheet.getDataRange().getValues()
  const messages = rows.slice(1).map(r => ({
    id:   r[0],
    name: r[1],
    text: r[2],
    time: r[3],
  })).reverse()  // mới nhất lên đầu

  return ContentService
    .createTextOutput(JSON.stringify(messages))
    .setMimeType(ContentService.MimeType.JSON)
}

// POST — thêm lời chúc (sổ lưu bút) hoặc xác nhận tham dự
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const id = data.id || Date.now()

    // Xác nhận tham dự → ghi sang tab riêng
    if (data.type === 'rsvp') {
      getRsvpSheet().appendRow([
        id,
        data.name,
        data.attendanceLabel || data.attendance,
        data.message,
        data.time,
      ])
      return ContentService
        .createTextOutput(JSON.stringify({ ok: true, id }))
        .setMimeType(ContentService.MimeType.JSON)
    }

    // Lời chúc (sổ lưu bút)
    getSheet().appendRow([id, data.name, data.text, data.time])
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, id }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
