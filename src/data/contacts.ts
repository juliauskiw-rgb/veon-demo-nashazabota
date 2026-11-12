// Single source of contact facts: veon/client.json -> company.contacts, socials. Nothing here is invented.
export const phones = [
  { tel: "+380968918055", text: "+380 96 891 80 55" },
  { tel: "+380995186478", text: "+380 99 518 64 78" },
] as const;
export const telegram = "https://t.me/nasha_zabota777";
export const whatsapp = "https://api.whatsapp.com/send/?phone=380968918055";
export const email = "nasha.zabota.odessa@gmail.com";
export const socials = [
  { name: "Instagram", url: "https://www.instagram.com/center_nasha.zabota/" },
  { name: "Facebook", url: "https://www.facebook.com/nasha.zabota.od" },
  { name: "YouTube", url: "https://www.youtube.com/@ДімРеабілітаціїНашаТурбота" },
] as const;
export const note = "Розділ у розробці";
// Questions of the page: one list for headings, mobile menu and desktop rail.
export const questions = [
  { id: "diagnoses", q: "З якими діагнозами приймаєте на реабілітацію?", short: "Діагнози", nav: "Напрями" },
  { id: "stay", q: "Хто буде поруч із близьким уночі?", short: "Уночі поруч", nav: "Перебування" },
  { id: "program", q: "Хто і як відновлюватиме?", short: "Хто відновлює", nav: "Програма" },
  { id: "prices", q: "Скільки коштує тиждень у центрі?", short: "Ціна тижня", nav: "Ціни" },
  { id: "place", q: "Куди ви привезете близького?", short: "Куди їхати", nav: "Місце" },
  { id: "trust", q: "Де побачити центр до приїзду?", short: "Де побачити", nav: "Довіра" },
  { id: "contacts", q: "Як домовитися про місце?", short: "Як домовитись", nav: "Контакти" },
] as const;
