import { DEFAULT_PROFILE_IMAGE_PATH } from '@/constants/constants';
import { generateRandomNickname } from '@/utils/generateRandomNickname';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        }
      }
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user }
  } = await supabase.auth.getUser();

  console.log(user);

  // 유저세션이 존재하는 경우.
  if (user) {
    const userId = user?.id;
    const { data } = await supabase.from('users').select('*').eq('id', userId).single();

    // DB에 있는 "users" Table에 유저데이터가 존재하지 않을 경우.
    if (!data) {
      const { data, error } = await supabase.from('users').insert({
        gender: '귀여운 사람',
        username: generateRandomNickname(),
        profile_image_path: DEFAULT_PROFILE_IMAGE_PATH
      });
    }
  }

  if (user && (request.nextUrl.pathname.startsWith('/log-in') || request.nextUrl.pathname.startsWith('/sign-up'))) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (
    !user &&
    request.nextUrl.pathname !== '/' &&
    !request.nextUrl.pathname.startsWith('/log-in') &&
    !request.nextUrl.pathname.startsWith('/sign-up') &&
    !request.nextUrl.pathname.startsWith('/api')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/log-in';
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
