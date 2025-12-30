export function getForgotPasswordTemplate (link) {
  return `<!DOCTYPE html>
<html style="font-family:arial, 'helvetica neue', helvetica, sans-serif">

<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>Verification E-Mail</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  </style>
  <style>
    .linkAnchor>a {
      text-decoration: none;
      -webkit-text-size-adjust: none;
      -ms-text-size-adjust: none;
      mso-line-height-rule: exactly;
      color: #FFFFFF;
      font-size: 16px;
      font-family: Inter, merriweather, georgia, 'times new roman', serif;
      font-weight: 600 !important;
      line-height: 19px !important;
      text-align: center;
      line-height: 20px !important;
      color: white !important;
      text-decoration: none;
    }
  </style>
</head>

<body
  style="width:100%;font-family:Inter, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <h1 style='display:none'> {####}</h1>
  <div class="es-wrapper-color" style="background-color:#FFFFFF">
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
      <tr>
        <td valign="top" style="padding:0;Margin:0">
          <table class="es-footer" cellspacing="0" cellpadding="0" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#bcb8b1" align="center"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                  <tr>
                    <td align="left"
                      style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px">
                      <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td valign="top" align="center" style="padding:0;Margin:0;width:520px">
                            <table width="100%" cellspacing="0" cellpadding="0"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td style="padding:15px;Margin:0;font-size:0px" align="center"><a target="_blank"
                                    href="https://www.weplaysoftware.com/"
                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2D3142;font-size:14px"><img
                                      src="https://grpoty.stripocdn.email/content/guids/CABINET_2e644e99377e9c0a4c5fff9f14cd2dfad0849b82e6501d6a77fb9ef6ecedef33/images/vector.png"
                                      alt="Logo"
                                      style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                      title="Logo" height="29"></a></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table class="es-content" cellspacing="0" cellpadding="0" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <table class="es-content-body"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#fbfaff;border-radius:20px 20px 0px 0px;width:600px"
                  cellspacing="0" cellpadding="0" bgcolor="#FBFAFF" align="center">
                  <tr>
                    <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:40px;padding-right:40px">
                      <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td valign="top" align="center" style="padding:0;Margin:0;width:520px">
                            <table
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#fafafa;border-radius:10px"
                              width="100%" cellspacing="0" cellpadding="0" bgcolor="#fafafa">
                              <tr>
                                <td bgcolor="#fbfaff" align="center" style="padding:12px;Margin:0">
                                  <h3
                                    style="Margin:0;line-height:34px;mso-line-height-rule:exactly;font-family:Inter, Imprima, Arial, sans-serif;font-size:28px;font-style:normal;font-weight:600;color:#191919;margin-bottom:16px;line-height: 120%;letter-spacing: 0.005em">
                                    Let’s Reset Your Password
                                  </h3>
                                  <p style="font-weight:400;font-size:14px;color:#666666;font-family:Inter, Arial;">
                                    To proceed updating your password, we need to confirm your email by clicking the
                                    “Reset Password” button below.
                                  </p>
                                  <p
                                    style="font-weight:400;font-size:14px;color:#666666;font-family:Inter, Arial;padding-top: 22px;margin-bottom: 0px;">
                                    You
                                    can update your password in the next screen.</p>
                                </td>

                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <table class="es-content" cellspacing="0" cellpadding="0" align="center"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
            <tr>
              <td align="center" style="padding:0;Margin:0">
                <table class="es-content-body"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#fbfaff;width:600px;border-radius:0px 0px 20px 20px"
                  cellspacing="0" cellpadding="0" bgcolor="#FBFAFF" align="center">
                  <tr>
                    <td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:40px">
                      <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td valign="top" align="center" style="padding:0;Margin:0;width:520px">
                            <table width="100%" cellspacing="0" cellpadding="0"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td class="h-auto" valign="middle" height="59" align="center"
                                  style="padding:0;Margin:0">
                                  <span class="linkAnchor"
                                    style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:16px;padding:10px 20px;display:inline-block;background:#05060F;border-radius:8px;font-family:Inter, merriweather, georgia, 'times new roman', serif;font-weight:600;line-height:19px;width:auto;text-align:center;mso-hide:all;border-color:#070709;line-height:20px;color:white;text-decoration: none;">${link}</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px;font-size:0px"
                                  align="center">
                                  <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr>
                                      <td
                                        style="padding:0;Margin:0;border-bottom:1px solid #E6E6E6;background:unset;height:1px;width:100%;margin:0px">
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0;Margin:0;padding-left:40px;padding-right:40px;border-radius:0px 0px 20px 25px"
                      align="left">
                      <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr>
                          <td valign="top" align="center" style="padding:0;Margin:0;width:520px">
                            <table width="100%" cellspacing="0" cellpadding="0"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                                <td class="es-m-txt-c"
                                  style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px;font-size:0"
                                  align="center">
                                  <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr>
                                      <td valign="top" align="center" style="padding:0;Margin:0;padding-right:40px"><img
                                          src="https://grpoty.stripocdn.email/content/assets/img/social-icons/rounded-black/twitter-rounded-black.png"
                                          alt="Tw" title="Twitter" height="24"
                                          style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;width:24px;height:24px">
                                      </td>
                                      <td valign="top" align="center" style="padding:0;Margin:0;padding-right:40px"><img
                                          src="https://grpoty.stripocdn.email/content/assets/img/social-icons/rounded-black/facebook-rounded-black.png"
                                          alt="Fb" title="Facebook" height="24"
                                          style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;width:24px;height:24px">
                                      </td>
                                      <td valign="top" align="center" style="padding:0;Margin:0;padding-right:40px"><img
                                          src="https://grpoty.stripocdn.email/content/assets/img/social-icons/rounded-black/linkedin-rounded-black.png"
                                          alt="In" title="Linkedin" height="24"
                                          style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;width:24px;height:24px">
                                      </td>
                                      <td valign="top" align="center" style="padding:0;Margin:0"><img
                                          src="https://grpoty.stripocdn.email/content/assets/img/social-icons/rounded-black/instagram-rounded-black.png"
                                          alt="Ig" title="Instagram" height="24"
                                          style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;width:24px;height:24px">
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" style="padding:40px; padding-top:10px;Margin:0;padding-bottom:25px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Imprima, Arial, sans-serif;line-height:18px;color:#666666;font-size:12px;font-weight:400">
                                    This is an automated message, so please don’t reply to this email. You can <a
                                      style='font-family: Inter; font-size:12px; line-height:18px;color:#3991F9;font-weight:400'>contact
                                      us</a> via our website.
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td class="h-auto" valign="middle" height="54" align="center"
                                  style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Inter Imprima, Arial, sans-serif;line-height:18px;color:#191919;font-size:12px;font-weight:700;margin-right: 28px;">
                                    <strong>Las Vegas, Nevada</strong>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:0;Margin:0" align='center'>
                                  <table class="es-menu" width="100%" cellspacing="0" cellpadding="0"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:auto">
                                    <tr class="links" style="align: center">
                                      <span style='padding-bottom: 30px; width:100%; display:inline-block'>
                                        <a
                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:Inter Imprima, Arial, sans-serif;color:#191919;font-size:12px;font-weight:400;width:80px;align:center;display:inline-block">Help
                                          Center</a>
                                        <a
                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:Inter Imprima, Arial, sans-serif;color:#191919;font-size:12px;font-weight:400;width:80px;align:center;display:inline-block">Privacy
                                          Policy</a>
                                        <a
                                          style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:Inter Imprima, Arial, sans-serif;color:#191919;font-size:12px;font-weight:400;width:100px;align:center;display:inline-block">Terms
                                          of Service</a>
                                      </span>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>

</html>`;
};
