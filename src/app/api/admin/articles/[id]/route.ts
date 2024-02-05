import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest,{params}:any) {
    const {id} =params;
    
    const data =await req.json()
    await prisma.article.update({
        where:{id},
        data:data
    })
    return NextResponse.json({
        success:true,
        errormessage:'修改成功'
    })
}

export async function DELETE(req: NextRequest,{params}:any){
    console.log('DELETE——id',params);
    const {id} =params;
    await prisma.article.delete({
        where:{id}
    })
    return NextResponse.json({
        success:true,
        errormessage:'删除成功'
    })
}