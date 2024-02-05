import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const per =req.nextUrl.searchParams.get("per") || 10
    const page=req.nextUrl.searchParams.get("page") || 1
    const title =req.nextUrl.searchParams.get("title") || ""
    const data =await prisma.article.findMany({
        where:{title:{contains:title}},
        orderBy:{createdAt:"desc"},
        take:(+per),//取多少条数据
        skip:(+page-1)*(+per),//跳过多少数据
    })
    const total=await prisma.article.count({where:{title:{contains:title}}})//获取总数
    return NextResponse.json({
        success:true,
        errormessage:"",
        data,
        pages:Math.ceil(total/+per),//总页数
        total//数据总条数
    })
}

export async function POST(req: NextRequest) {
    const data =await req.json()
    await prisma.article.create({
        data:data
    })
    return NextResponse.json({
        success:true,
        errormessage:'提交成功',
        data:{}
    })
}

