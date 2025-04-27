import { http } from "../instances/instances"

interface FormData {
  [Symbol.iterator](): FormDataIterator<[string, FormDataEntryValue]>;
  /** Returns an array of key, value pairs for every entry in the list. */
  entries(): FormDataIterator<[string, FormDataEntryValue]>;
  /** Returns a list of keys in the list. */
  keys(): FormDataIterator<string>;
  /** Returns a list of values in the list. */
  values(): FormDataIterator<FormDataEntryValue>;
}

interface UploadResponse {
  code: number;
  message: string;
  data: {
    url: string; // 上传后的 URL
  };
}
export const uploadImg = (file: FormData): Promise<UploadResponse> => {
  return http.post('/file/put', file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
