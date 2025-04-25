export function getErrorHtml(key: string, info?: string): string {
  return `<div class="inline-grid *:[grid-area:1/1]">
    <div class="status status-error animate-ping"></div>
    <div class="status status-error"></div>
  </div><span class="text-error font-bold">${key}</span> 格式不正确: ${info || '无描述'}`;
}

export interface Field {
  val: string;
  exp?: RegExp | RegExp[];
  info?: string;
  errorInfo?: string;
}
export type Data = { [key: string]: Field };
export function testExp(data: Data): Promise<boolean> {
  const errors: { [key: string]: string } = {};

  return new Promise((resolve, reject) => {
    Object.keys(data).forEach(key => {
      const field = data[key]
      if (field.exp) {
        const isValid = Array.isArray(field.exp)
          ? field.exp.some(regex => regex.test(field.val))
          : field.exp.test(field.val)
        if (!isValid) {
          errors[key] = `${key} 格式不正确`;
          data[key].errorInfo = getErrorHtml(key, field.info);
        } else {
          data[key].errorInfo = ''
        }
      }
    });


    console.log(errors);


    if (Object.keys(errors).length === 0) {
      resolve(true)
    } else {
      reject(false)
    }
  })
}
