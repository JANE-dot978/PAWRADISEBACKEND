const PDFDocument = require('pdfkit');
const Booking = require('../models/booking.model');
const Event = require('../models/event.model');

// Generate PDF Report
exports.generateReport = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('eventId userId');

    // Create new PDF
    const doc = new PDFDocument();
    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=report.pdf',
          'Content-Length': pdfData.length
        })
        .end(pdfData);
    });

    // PDF content
    doc.fontSize(18).text('Pawradise Bookings Report', { align: 'center' });
    doc.moveDown();

    bookings.forEach((booking, index) => {
      doc
        .fontSize(12)
        .text(`Booking #${index + 1}`)
        .text(`User: ${booking.userId.firstName} ${booking.userId.lastName}`)
        .text(`Event: ${booking.eventId.name}`)
        .text(`Date: ${booking.createdAt.toDateString()}`)
        .moveDown();
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating report' });
  }
};

