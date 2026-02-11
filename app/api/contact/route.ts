import { NextResponse } from "next/server";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_API_KEY = process.env.BREVO_API_KEY!;

// Email destinataire (vous)
const OWNER_EMAIL = "verso.direction@gmail.com";
const OWNER_NAME = "Verso Agency";

export async function POST(req: Request) {
  try {
    const { name, lastname, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs requis manquants." },
        { status: 400 }
      );
    }

    const fullName = `${name}${lastname ? ` ${lastname}` : ""}`;
    const now = new Date().toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // ───────────────────────────────────────────────
    // 1) Email vers vous (notification nouveau message)
    // ───────────────────────────────────────────────
    const ownerHtml = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.05);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:32px 40px;">
              <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">✉️ Nouveau message</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">${now}</p>
            </td>
          </tr>
          <!-- Contact info -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px 20px;background:rgba(79,70,229,0.08);border-radius:12px;border:1px solid rgba(79,70,229,0.15);">
                    <p style="margin:0 0 8px;color:#a5b4fc;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Expéditeur</p>
                    <p style="margin:0 0 4px;color:#fff;font-size:18px;font-weight:600;">${fullName}</p>
                    <a href="mailto:${email}" style="color:#818cf8;font-size:14px;text-decoration:none;">${email}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Message -->
          <tr>
            <td style="padding:24px 40px 32px;">
              <p style="margin:0 0 12px;color:#a5b4fc;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Message</p>
              <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;">
                <p style="margin:0;color:#e5e5e5;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 32px;" align="center">
              <a href="mailto:${email}?subject=Re: Votre message - Verso Agency" style="display:inline-block;background:#4f46e5;color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">
                Répondre à ${name}
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;color:#555;font-size:12px;text-align:center;">Verso Agency — Formulaire de contact</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // ───────────────────────────────────────────────
    // 2) Email de confirmation au visiteur
    // ───────────────────────────────────────────────
    const confirmationHtml = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.05);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:40px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">VERSO</h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;letter-spacing:2px;text-transform:uppercase;">Agency</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 8px;color:#fff;font-size:22px;font-weight:600;">Merci ${name} 👋</h2>
              <p style="margin:0 0 24px;color:#a3a3a3;font-size:15px;line-height:1.7;">
                Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais, généralement sous 24h.
              </p>

              <!-- Recap -->
              <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;margin-bottom:24px;">
                <p style="margin:0 0 8px;color:#a5b4fc;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Récapitulatif de votre message</p>
                <p style="margin:0;color:#d4d4d4;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message}</p>
              </div>

              <!-- What's next -->
              <div style="background:rgba(79,70,229,0.08);border:1px solid rgba(79,70,229,0.15);border-radius:12px;padding:20px;">
                <p style="margin:0 0 12px;color:#a5b4fc;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Prochaines étapes</p>
                <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding:6px 0;color:#e5e5e5;font-size:14px;">
                      <span style="color:#818cf8;font-weight:600;">01.</span> Analyse de votre demande par notre équipe
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#e5e5e5;font-size:14px;">
                      <span style="color:#818cf8;font-weight:600;">02.</span> Réponse personnalisée sous 24h
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#e5e5e5;font-size:14px;">
                      <span style="color:#818cf8;font-weight:600;">03.</span> Proposition sur-mesure si pertinent
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
              <p style="margin:0 0 8px;color:#666;font-size:13px;">Verso Agency — Toulouse, France</p>
              <p style="margin:0;color:#555;font-size:12px;">
                <a href="https://www.verso-agency.fr" style="color:#818cf8;text-decoration:none;">verso-agency.fr</a>
                &nbsp;•&nbsp;
                <a href="mailto:contact@verso-agency.fr" style="color:#818cf8;text-decoration:none;">contact@verso-agency.fr</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Envoyer les deux emails en parallèle via Brevo
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    };

    const [ownerRes, confirmRes] = await Promise.all([
      // Email notification vers vous
      fetch(BREVO_API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          sender: { name: "Verso Agency", email: "contact@verso-agency.fr" },
          to: [
            { email: OWNER_EMAIL, name: OWNER_NAME },
            { email: "contact@verso-agency.fr", name: "Verso Agency" },
          ],
            replyTo: { email: "contact@verso-agency.fr", name: "Verso Agency" },
          subject: `💬 Nouveau message de ${fullName}`,
          htmlContent: ownerHtml,
        }),
      }),
      // Email de confirmation au visiteur
      fetch(BREVO_API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          sender: { name: OWNER_NAME, email: "contact@verso-agency.fr" },
          to: [{ email, name: fullName }],
          replyTo: { email: OWNER_EMAIL, name: OWNER_NAME },
          subject: `Merci pour votre message, ${name} ! — Verso Agency`,
          htmlContent: confirmationHtml,
        }),
      }),
    ]);

    if (!ownerRes.ok) {
      const err = await ownerRes.json();
      console.error("Brevo owner email error:", err);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi." },
        { status: 500 }
      );
    }

    if (!confirmRes.ok) {
      const err = await confirmRes.json();
      console.error("Brevo confirmation email error:", err);
      // On ne bloque pas si la confirmation échoue — le message principal est envoyé
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}
