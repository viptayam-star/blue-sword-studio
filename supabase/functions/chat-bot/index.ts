import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();

    const systemPrompt = `أنت مساعد ذكي لموقع مصمم جرافيك محترف. معلومات عن صاحب الموقع:

- مصمم جرافيك متخصص في الشعارات والهويات البصرية
- حاصل على شهادة معتمدة من Lumina Ai Academy
- يقدم باقات تصميم متنوعة:
  * الباقة الأسبوعية: 1000 جنيه - تصاميم سوشيال ميديا أسبوعية
  * الباقة الشهرية: 10,000 جنيه - محتوى شهري متكامل مع دعم فني
  * الباقة السنوية: 18,500 جنيه (بدلاً من 20,000) - تغطية سنوية كاملة مع خصم 7.5%
- رقم التواصل: 01022065189
- يمكن التواصل عبر واتساب مباشرة
- لديه معرض أعمال متنوع يشمل:
  * تصميم شعارات (Logos)
  * تصاميم سوشيال ميديا
  * هويات بصرية متكاملة (Branding)
  * إعلانات للمنتجات والخدمات
- عمل مع علامات تجارية مثل: Juhayna، Buffalo Burger، وغيرها
- متخصص في تصميمات إبداعية للمطاعم والمنتجات الغذائية
- يقدم تصاميم احترافية للمنتجات التجميلية مثل DERMA

مهمتك:
1. الإجابة على الأسئلة عن خدمات المصمم وأعماله
2. شرح الباقات المتاحة والأسعار
3. تقديم معلومات عن طريقة التواصل
4. الرد بشكل ودي واحترافي باللغة العربية
5. عدم الإجابة على أسئلة خارج نطاق الموقع أو الخدمات المقدمة

أجب دائماً باللغة العربية بطريقة واضحة ومختصرة.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message: botMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
