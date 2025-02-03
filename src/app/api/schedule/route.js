import { supabase } from "../lib/supabase";

const type = new Map([
  ["휴가", 0],
  ["외부 교육", 1],
]);

const subType = new Map([
  ["하루 종일", 0],
  ["오전", 1],
  ["오후", 2],
]);

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const email = searchParams.get("email");
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const startOfMonth = new Date(year, month, 1).getTime();
  const endOfMonth = new Date(year, month + 1, 1).getTime();

  const { data, error } = await supabase
    .from("schedule")
    .select("id, type, sub_type, detail, date, user:user_id(name, email)")
    .eq("user.email", email)
    .gte("date", startOfMonth)
    .lt("date", endOfMonth);

  if (error) {
    if (error.code && error.hint === null) {
      return new Response(JSON.stringify("결과가 없습니다."), { status: 404 });
    }
    return new Response(JSON.stringify("에러에러"), { status: 500 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("schedule")
    .insert([
      {
        user_id: 1,
        type: type.get(body.type),
        sub_type: subType.get(body.option),
        detail: body.detail,
        date: body.date,
      },
    ])
    .select();

  return new Response("ok", { status: 200 });
}
