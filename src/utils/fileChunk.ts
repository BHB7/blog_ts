
const CHUNK_SIZE = 1024 * 1024 * 4 // 4MB
export const fileChunk = (file: File, chunkSize: number = CHUNK_SIZE) => {
  const start = 0
  const chunks = []
  while (start < chunkSize) {
    const end = (chunkSize + start) - CHUNK_SIZE
    console.log(file.slice(start, end));

  }
}
