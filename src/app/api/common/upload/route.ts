import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
//该api供前端上传图片MyLoad组件调用
async function saveFile(blob: File) {
  const dirName = "/upload/" + dayjs().format("YYYY-MM-DD"); //图片路径
  const uploadDir = path.join(process.cwd(), "public" + dirName); //拼接生成最终绝对路径
  fs.mkdirSync(uploadDir, { recursive: true }); //创建目录，recursive，如果不存在则递归创建
  const fileName = randomUUID() + ".png";
  const arrayBuffer = await blob.arrayBuffer();
  fs.writeFileSync(path.join(uploadDir, fileName), new DataView(arrayBuffer)); //new Uint8Array
  return dirName + "/" + fileName;
}

export async function POST(req: NextRequest) {
  const data = await req.formData(); //获取formData格式数据
  const file = data.get("file"); //提交图片文件
  const url = await saveFile(file as File); //保存图片文件在后端服务器目录，返回保存imageUrl供数据库用
  return NextResponse.json({
    success: true,
    errormessage: "上传成功",
    data: url,
  });
}
