
const CHUNK_SIZE = 1024 * 1024 * 4 // 4MB
export const fileChunk = (file: File, chunkSize: number = CHUNK_SIZE) => {
  const start = 0
  const chunks = []

  while (start < file.size) {
    const end = Math.min(start, start + chunkSize)
    // console.log(file.slice(start, end))
    chunks.push({ file: file.slice(start, end) })
  }
  console.log(chunks)

}
