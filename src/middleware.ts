import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {

//访问的如果是admin则执行
    if(req.nextUrl.pathname.startsWith('/admin')){
        //判断url访问非login以外的其他任何admin页面
        if (!req.nextUrl.pathname.startsWith('/admin/login')) {
            //获取request的cookie判断
            if(req.cookies.get('admin-token') ){
                // console.log('有ck的');
                
            }else{
                //没登录返回login页面
                return NextResponse.redirect(new URL('/admin/login', req.url))
            }

            
            }
    }    
}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }