export function ContactForm({ chinese = false }: { chinese?: boolean }) {
  return <form className="contact-form" action="https://formsubmit.co/cyrillusmariae@outlook.com" method="POST">
    <input type="hidden" name="_subject" value="Website enquiry from chavezpoon.com" />
    <input type="hidden" name="_template" value="table" />
    <div className="form-honey" aria-hidden="true"><label htmlFor="contact-company">Leave this empty</label><input id="contact-company" name="_honey" tabIndex={-1} autoComplete="off" /></div>
    <div className="form-fields-row"><label>{chinese ? "姓名" : "Name"}<input name="name" autoComplete="name" placeholder={chinese ? "你的姓名" : "Your name"} required /></label><label>{chinese ? "電郵" : "Email"}<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label></div>
    <label>{chinese ? "主題" : "Subject"}<input name="subject" placeholder={chinese ? "想談談甚麼？" : "What would you like to discuss?"} required /></label>
    <label>{chinese ? "訊息" : "Message"}<textarea name="message" rows={5} placeholder={chinese ? "請在此輸入訊息……" : "Write your message here…"} required /></label>
    <button className="button button-dark" type="submit">{chinese ? "傳送訊息" : "Send a message"}<span aria-hidden="true">↗</span></button>
  </form>;
}
