export async function POST(request: Request) {
  const data = await request.formData();
  const audio = data.get("audio");
  if (audio instanceof File) {
    const audioData = await audio.arrayBuffer();
    const response = await fetch("...");
    audioData.byteLength;
    return Response.json({
      message: "Audio received",
      size: audioData.byteLength,
    });
  } else {
    return Response.json({
      message: "audio file required",
    });
  }
}
