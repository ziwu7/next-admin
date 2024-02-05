import prisma from '@/db'
import { NextRequest,NextResponse } from 'next/server'

export async function GET() {
    const data = await prisma.goods.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })
    return NextResponse.json({
        success:true,
        errorMessage:"查询成功",
        data:data
        }
    )
}

export async function POST(req:NextRequest){
    // console.log('json',await req.json());不能消耗掉req，req 对象是一个可读流
   const data = await req.json()
   console.log('data',data);
   
   await prisma.goods.create({
    data:data
        }
   )
   return NextResponse.json({
        success:true,
        errorMessage:"创建成功",
        data:{}
   })

}