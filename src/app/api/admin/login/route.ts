import { headers } from "next/headers";
import { NextRequest ,NextResponse} from "next/server";

export async function POST(req:NextRequest) {
    
    return NextResponse.json({
        success:true,
        errorMessage:"登录成功"
    },{
        headers:{
        'Set-Cookie':'admin-token=123;Path=/'
        }
    })
        
    
}