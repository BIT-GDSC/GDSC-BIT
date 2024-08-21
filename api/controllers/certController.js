const Certificate = require('../models/certModel.js')
const CryptoJS = require('crypto-js')

exports.verifyCertificate = async (req, res) => {
  try {
    const certData = await Certificate.findById(
      req.params.certificateID
    ).select('fullName verifyURL verifyQR skillBoostQR certificate appreciation')
    if (!certData) {
      return res.status(400).json({
        success: false,
        msg: 'Certificate not found',
      })
    }
    console.log(certData)
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(certData),
      process.env.DATA_ENCRYPTION_SECRET_KEY
    ).toString()
    res.status(200).json({
      success: true,
      data: encryptedData,
    })
  } catch (error) {
    res.send('Try again after some time!')
  }
}
