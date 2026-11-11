/* 星空主页：十二颗星连成一条线，摘一颗就少一颗；
   摘下来的星原地暗下去（还能点回去），十二颗摘完，露出在一起的天数。
   内容都写在 PARTS 里，一条对应一颗星。 */
(() => {
  const TOTAL = 12;            // 星座点数（先布满 12 个位置）

  // 星座点位（0–1 相对画布），沿一条线绕过去，不排成整齐的圆
  const SLOTS = [
    { x: 0.18, y: 0.43, s: 1.0 },
    { x: 0.33, y: 0.26, s: 0.9 },
    { x: 0.50, y: 0.35, s: 1.06 },
    { x: 0.66, y: 0.20, s: 0.82 },
    { x: 0.80, y: 0.32, s: 0.96 },
    { x: 0.70, y: 0.48, s: 0.86 },
    { x: 0.54, y: 0.56, s: 1.02 },
    { x: 0.38, y: 0.50, s: 0.8 },
    { x: 0.26, y: 0.64, s: 1.04 },
    { x: 0.44, y: 0.70, s: 0.88 },
    { x: 0.62, y: 0.66, s: 0.94 },
    { x: 0.78, y: 0.58, s: 0.84 }
  ];

  // 星的顺序 = 掉落顺序，也是内容顺序（先三颗，其余星等有内容了再往 PARTS 里加）
  const PARTS = [
    {
      id: 'her',
      wall: 'her',
      title: '她',
      sub: '从你手机里挑出来的二十二张，我一张都没舍得删。',
      photos: [
        { src: 'img/her/p1.jpg', caption: '帽子压得很低，眼睛还是很大' },
        { src: 'img/her/p2.jpg', caption: '火锅上桌的那三秒' },
        { src: 'img/her/p3.jpg', caption: '兔子耳朵，一只手扶着' },
        { src: 'img/her/p4.jpg', caption: '盯着镜头，没笑' },
        { src: 'img/her/p5.jpg', caption: '吃到一半才想起来拍' },
        { src: 'img/her/p6.jpg', caption: '低头的时候，头发全垂下来' },
        { src: 'img/her/p7.jpg', caption: '猫须是滤镜，不是真的' },
        { src: 'img/her/p8.jpg', caption: '头发刚吹干' },
        { src: 'img/her/p9.jpg', caption: '在家里，头发随便扎着' },
        { src: 'img/her/p10.jpg', caption: '“嘘”' },
        { src: 'img/her/p11.jpg', caption: '侧过脸的那一下' },
        { src: 'img/her/p12.jpg', caption: '船上，风很大' },
        { src: 'img/her/p13.jpg', caption: '眨眼被抓到了' },
        { src: 'img/her/p14.jpg', caption: '滤镜把眼睛放大了两圈' },
        { src: 'img/her/p15.jpg', caption: '侧脸，睫毛很长' },
        { src: 'img/her/p16.jpg', caption: '白外套，刘海挡了一半' },
        { src: 'img/her/p17.jpg', caption: '你盯着镜子里的自己' },
        { src: 'img/her/p18.jpg', caption: '三张拼在一起的' },
        { src: 'img/her/p19.jpg', caption: '墨镜加胡子，你说这叫帅' },
        { src: 'img/her/p20.jpg', caption: '后脑勺，头发长到能扎起来了' },
        { src: 'img/her/p21.jpg', caption: '睡着了，我在这边看了一会儿' },
        { src: 'img/her/p22.jpg', caption: '视频里你睡着了，我没舍得挂' },
      ]
    },
    {
      id: 'us',
      wall: 'us',
      title: '我们',
      sub: '能翻出来的合照不多，这十张是我最舍不得删的。',
      photos: [
        { src: 'img/us/p1.jpg', caption: '这张是我们最好的一张' },
        { src: 'img/us/p2.jpg', caption: '手机挡住了两个人的脸' },
        { src: 'img/us/p3.jpg', caption: '心形是滤镜自己加上去的' },
        { src: 'img/us/p4.jpg', caption: '胡子是滤镜，笑是真的' },
        { src: 'img/us/p5.jpg', caption: '同一顶帽子，两条胡子' },
        { src: 'img/us/p6.jpg', caption: '你比我还紧张' },
        { src: 'img/us/p7.jpg', caption: '船上，风把你头发吹乱了' },
        { src: 'img/us/p8.jpg', caption: '靠在一起就不冷' },
        { src: 'img/us/p9.jpg', caption: '这张也留着' },
        { src: 'img/us/p10.jpg', caption: '你在看手机，我在看你' },
      ]
    },
    {
      id: 'me',
      wall: 'me',
      title: '我',
      sub: '你手机里存的我，大概就是这个样子。',
      photos: [
        { src: 'img/me/p1.jpg', caption: '吃饭的时候最专心' },
        { src: 'img/me/p2.jpg', caption: '这张是你让我拍的' },
        { src: 'img/me/p3.jpg', caption: '手里还拎着东西' },
        { src: 'img/me/p4.jpg', caption: '电梯里的镜子' },
        { src: 'img/me/p5.jpg', caption: '卫衣穿了一整个冬天' },
        { src: 'img/me/p6.jpg', caption: '白T恤，头发刚睡醒' },
        { src: 'img/me/p7.jpg', caption: '出门前照的那张' },
        { src: 'img/me/p8.jpg', caption: '背包里装着书和水杯' },
        { src: 'img/me/p9.jpg', caption: '对着镜子，我总拍不好' },
        { src: 'img/me/p10.jpg', caption: '又在这家店' },
        { src: 'img/me/p11.jpg', caption: '视频里比了个心，你在小窗里笑' },
      ]
    },
    {
      id: 'scn',
      wall: 'scn',
      title: '路上',
      sub: '这一颗先空着。你以后随手拍到的天色、路口、水面，往这儿放就行。',
      empty: '还没有照片。点上面的「＋ 加照片」，从相册里挑几张传上来。',
      photos: []
    },
    {
      id: 'food',
      wall: 'food',
      title: '好吃的',
      sub: '吃完才想起来拍的那些。拍歪了也留着。',
      empty: '还没有照片。点「＋ 加照片」，把相册里那些饭传上来。',
      photos: []
    }
  ];

  const stage = document.getElementById('stage');
  const cvs = document.getElementById('sky');
  const tip = document.getElementById('skyTip');
  const countEl = document.getElementById('skyCount');
  const skyTo = document.getElementById('skyTo');
  // 窄屏那句提示会换行成两截，换短一点
  const tipShort = window.matchMedia('(max-width: 560px)').matches;
  if (tipShort) tip.textContent = '每一颗都能摘，先摘一颗。';
  const panel = document.getElementById('panel');
  const wall = document.getElementById('wall');
  const pnKicker = document.getElementById('pnKicker');
  const pnTitle = document.getElementById('pnTitle');
  const pnSub = document.getElementById('pnSub');
  const pnNote = document.getElementById('pnNote');
  // 说明句放到墙前面：空墙时别掉到相框下面去
  if (wall && pnNote) wall.parentNode.insertBefore(pnNote, wall);
  const closeBtn = document.getElementById('panelClose');
  const panelAdd = document.getElementById('panelAdd');
  const panelFile = document.getElementById('panelFile');
  const panelStatus = document.getElementById('panelStatus');
  const passGate = document.getElementById('passGate');
  const passInput = document.getElementById('passInput');
  const flash = document.getElementById('flash');
  const viewer = document.getElementById('viewer');
  const viewerImg = document.getElementById('viewerImg');
  const viewerCap = document.getElementById('viewerCap');
  const finale = document.getElementById('finale');
  const finaleNum = document.getElementById('finaleNum');
  const finaleLine = document.getElementById('finaleLine');
  const finaleAgain = document.getElementById('finaleAgain');

  const C = window.SITE || {};
  const ctx = cvs.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);
  const STORE = 'od-sky';

  let W = 0, H = 0, dpr = 1;
  let stars = [];
  let shooters = [];
  let t0 = performance.now();
  let hovered = -1;
  let busy = false;          // 正在转场
  let opened = -1;           // 当前打开的是第几颗

  // 每颗星的状态
  const state = SLOTS.map(() => ({ gone: false, fall: null, hv: 0 }));

  /* ── 背景星 ───────────────────────────── */
  const makeStars = () => {
    const count = Math.round(Math.min(420, Math.max(160, (W * H) / 5200)));
    stars = Array.from({ length: count }, () => {
      const layer = Math.random() < 0.5 ? 0 : Math.random() < 0.68 ? 1 : 2;
      return {
        x: Math.random(),
        y: Math.random(),
        r: layer === 0 ? rand(0.35, 0.85) : layer === 1 ? rand(0.75, 1.4) : rand(1.2, 2.1),
        a: layer === 0 ? rand(0.3, 0.62) : layer === 1 ? rand(0.5, 0.9) : rand(0.7, 1),
        phase: Math.random() * Math.PI * 2,
        speed: rand(0.35, 1.15) * (layer === 2 ? 0.6 : 1),
        warm: Math.random() < 0.22,
        layer
      };
    });
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    cvs.width = Math.round(W * dpr);
    cvs.height = Math.round(H * dpr);
    cvs.style.width = `${W}px`;
    cvs.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!stars.length) makeStars();
    placeHits();
  };

  /* ── 可点的星（真按钮，画面上不写字） ── */
  const hits = [];
  const placeHits = () => {
    SLOTS.forEach((slot, i) => {
      // 还没有内容的星只画不点
      if (i >= PARTS.length) return;
      let btn = hits[i];
      if (!btn) {
        btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'star-hit';
        btn.innerHTML = '<span class="sr-only"></span>';
        btn.addEventListener('click', () => { if (!busy) pick(i); });
        btn.addEventListener('mouseenter', () => { hovered = i; });
        btn.addEventListener('mouseleave', () => { if (hovered === i) hovered = -1; });
        btn.addEventListener('focus', () => { hovered = i; });
        btn.addEventListener('blur', () => { if (hovered === i) hovered = -1; });
        stage.appendChild(btn);
        hits[i] = btn;
      }
      btn.style.left = `${slot.x * W}px`;
      btn.style.top = `${slot.y * H}px`;
      const gone = state[i].gone;
      btn.classList.toggle('gone', gone);
      btn.querySelector('.sr-only').textContent = gone
        ? `回到第 ${i + 1} 颗星`
        : `摘下第 ${i + 1} 颗星`;
    });
  };

  /* ── 绘制 ─────────────────────────────── */
  const drawSky = () => {
    const g = ctx.createLinearGradient(0, 0, W * 0.3, H);
    g.addColorStop(0, '#05070e');
    g.addColorStop(0.45, '#070b16');
    g.addColorStop(1, '#0a1020');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    const band = ctx.createLinearGradient(0, H * 0.78, W, H * 0.12);
    band.addColorStop(0, 'rgba(120,140,180,0)');
    band.addColorStop(0.45, 'rgba(150,165,205,0.055)');
    band.addColorStop(0.55, 'rgba(190,185,210,0.05)');
    band.addColorStop(1, 'rgba(120,140,180,0)');
    ctx.fillStyle = band;
    ctx.fillRect(0, 0, W, H);

    ctx.globalCompositeOperation = 'lighter';
    const neb = [
      { x: 0.18, y: 0.16, r: 0.5, c: 'rgba(88,116,168,0.13)' },
      { x: 0.84, y: 0.74, r: 0.42, c: 'rgba(150,120,150,0.09)' },
      { x: 0.5, y: 0.92, r: 0.35, c: 'rgba(110,120,160,0.07)' }
    ];
    neb.forEach((n) => {
      const rg = ctx.createRadialGradient(n.x * W, n.y * H, 0, n.x * W, n.y * H, n.r * Math.max(W, H));
      rg.addColorStop(0, n.c);
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);
    });
    ctx.globalCompositeOperation = 'source-over';
  };

  const drawBgStars = (time) => {
    stars.forEach((s) => {
      const tw = 0.62 + 0.38 * Math.sin(time * s.speed + s.phase);
      const x = s.x * W;
      const y = s.y * H;
      const col = s.warm ? '255,228,186' : '226,236,255';
      ctx.beginPath();
      ctx.fillStyle = `rgba(${col},${(s.a * tw).toFixed(3)})`;
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (s.layer === 2) {
        const g2 = ctx.createRadialGradient(x, y, 0, x, y, s.r * 7);
        g2.addColorStop(0, `rgba(${col},${(0.16 * tw).toFixed(3)})`);
        g2.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.arc(x, y, s.r * 7, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };

  // 星座连线：两端越"活"，线越亮；都摘掉了就几乎看不见
  const drawLinks = () => {
    const links = [];
    for (let i = 0; i < TOTAL - 1; i += 1) links.push([i, i + 1]);
    links.push([0, 3], [4, 6], [8, 10]);   // 加三根支线，像真的星座

    ctx.globalCompositeOperation = 'lighter';
    links.forEach(([a, b]) => {
      const aliveA = state[a].gone ? 0 : 1;
      const aliveB = state[b].gone ? 0 : 1;
      const k = (aliveA + aliveB) / 2;
      const alpha = 0.028 + 0.062 * k;
      const A = SLOTS[a];
      const B = SLOTS[b];
      const g = ctx.createLinearGradient(A.x * W, A.y * H, B.x * W, B.y * H);
      g.addColorStop(0, `rgba(200,214,240,${alpha * (0.5 + 0.5 * aliveA)})`);
      g.addColorStop(1, `rgba(200,214,240,${alpha * (0.5 + 0.5 * aliveB)})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(A.x * W, A.y * H);
      ctx.lineTo(B.x * W, B.y * H);
      ctx.stroke();
    });
    ctx.globalCompositeOperation = 'source-over';
  };

  const drawStar = (i, time, now) => {
    const slot = SLOTS[i];
    const st = state[i];

    // 还没有内容的星：只留一点微光，点不了
    if (i >= PARTS.length) {
      const x0 = slot.x * W;
      const y0 = slot.y * H;
      const tw = 0.55 + 0.45 * Math.sin(time * 0.9 + i * 1.7);
      ctx.globalCompositeOperation = 'lighter';
      const rr = 16 * (slot.s || 1);
      const g1 = ctx.createRadialGradient(x0, y0, 0, x0, y0, rr);
      g1.addColorStop(0, `rgba(226,236,255,${0.16 + 0.08 * tw})`);
      g1.addColorStop(1, 'rgba(226,236,255,0)');
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.arc(x0, y0, rr, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(238,244,255,${0.5 + 0.2 * tw})`;
      ctx.beginPath();
      ctx.arc(x0, y0, 1.25 * (slot.s || 1), 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      return;
    }

    const target = hovered === i && !st.gone && !busy ? 1 : 0;
    st.hv += (target - st.hv) * 0.18;

    let x = slot.x * W;
    let y = slot.y * H;
    let alpha = 1;
    let scale = 1;

    // 掉落
    if (st.fall) {
      const p = Math.min(1, (now - st.fall.t0) / 900);
      const e = p * p;
      y += 0.62 * H * e * e;
      x += Math.sin(p * 6) * 6 * (1 - p);
      alpha = 1 - p;
      scale = 1 - 0.45 * p;
    }

    if (st.gone && !st.fall) {
      // 摘过的地方留一个很淡的星痕
      ctx.globalCompositeOperation = 'lighter';
      const r = 9 + st.hv * 3;
      const g0 = ctx.createRadialGradient(x, y, 0, x, y, r * 2.4);
      g0.addColorStop(0, `rgba(180,196,224,${0.10 + st.hv * 0.06})`);
      g0.addColorStop(1, 'rgba(180,196,224,0)');
      ctx.fillStyle = g0;
      ctx.beginPath();
      ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210,222,244,${0.28 + st.hv * 0.22})`;
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      return;
    }

    const pulse = 0.82 + 0.18 * Math.sin(time * 1.05 + i * 0.7);
    const hot = 1 + st.hv * 0.55;
    const base = slot.s || 1;

    ctx.globalCompositeOperation = 'lighter';
    const R = 40 * base * pulse * hot * scale;
    const g = ctx.createRadialGradient(x, y, 0, x, y, R);
    g.addColorStop(0, `rgba(255,246,226,${0.95 * pulse * alpha})`);
    g.addColorStop(0.14, `rgba(255,232,190,${0.52 * pulse * alpha})`);
    g.addColorStop(0.44, `rgba(255,214,160,${0.15 * pulse * alpha})`);
    g.addColorStop(1, 'rgba(255,214,160,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, R, 0, Math.PI * 2);
    ctx.fill();

    // 只有少数几颗带长星芒，其余短一点，免得整片像图标
    const flare = i % 3 === 0 || st.hv > 0.02;
    const len = (flare ? 22 : 9) * base * pulse * scale + st.hv * 10;
    ctx.strokeStyle = `rgba(255,240,210,${(flare ? 0.3 : 0.16) * pulse * alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - len, y); ctx.lineTo(x + len, y);
    ctx.moveTo(x, y - len * 0.8); ctx.lineTo(x, y + len * 0.8);
    ctx.stroke();

    ctx.fillStyle = `rgba(255,250,240,${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, 2.5 * base * hot * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, (22 + st.hv * 6) * base * pulse * scale, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,233,196,${(0.09 + 0.1 * pulse + st.hv * 0.12) * alpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  };

  const spawnShooter = () => {
    const fromLeft = Math.random() < 0.6;
    shooters.push({
      x: fromLeft ? rand(-0.1, 0.5) * W : rand(0.5, 1.1) * W,
      y: rand(0.02, 0.45) * H,
      vx: (fromLeft ? 1 : -1) * rand(0.42, 0.72),
      vy: rand(0.12, 0.3),
      life: 0,
      max: rand(70, 110)
    });
  };

  const drawShooters = () => {
    shooters = shooters.filter((s) => s.life < s.max);
    shooters.forEach((s) => {
      s.life += 1;
      s.x += s.vx * 16;
      s.y += s.vy * 16;
      const k = 1 - s.life / s.max;
      const tail = 90 * k;
      const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * tail, s.y - s.vy * tail);
      grad.addColorStop(0, `rgba(255,244,220,${0.7 * k})`);
      grad.addColorStop(1, 'rgba(255,244,220,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * tail, s.y - s.vy * tail);
      ctx.stroke();
    });
  };

  /* ── 摘星 ─────────────────────────────── */
  const save = () => {
    try { localStorage.setItem(STORE, JSON.stringify(state.map((s) => s.gone))); } catch {}
  };
  const load = () => {
    try {
      const arr = JSON.parse(localStorage.getItem(STORE) || '[]');
      arr.forEach((g, i) => { if (i < TOTAL) state[i].gone = !!g; });
    } catch {}
  };

  const updateCount = () => {
    const n = state.filter((s, i) => i < PARTS.length && s.gone).length;
    countEl.textContent = `${n} / ${PARTS.length}`;
    return n;
  };

  const pick = (i) => {
    if (busy) return;
    busy = true;
    tip.classList.add('off');
    skyTo.classList.add('off');

    const slot = SLOTS[i];
    const sx = slot.x * W;
    const sy = slot.y * H;

    // 星掉下去
    state[i].fall = { t0: performance.now() };

    // 镜头跟着它推近
    stage.style.transformOrigin = `${sx}px ${sy}px`;
    stage.style.transition = reduce ? 'none' : 'transform .9s cubic-bezier(.4,0,.2,1)';
    stage.style.transform = reduce ? 'none' : 'scale(4.2)';

    setTimeout(() => flash.classList.add('on'), reduce ? 0 : 560);
    setTimeout(() => {
      state[i].fall = null;
      state[i].gone = true;
      save();
      placeHits();
      openPanel(i);
      flash.classList.remove('on');
    }, reduce ? 80 : 980);
  };

  /* ── 手机加照片：Supabase Storage ─────────── */
  const SB = C.supa || null;
  const sbHeaders = (json) => {
    const h = { apikey: SB.key, Authorization: `Bearer ${SB.key}` };
    if (json) h['Content-Type'] = 'application/json';
    return h;
  };
  const publicUrl = (wallKey, name) => `${SB.url}/storage/v1/object/public/${SB.bucket}/${wallKey}/${name}`;

  // 已经传上去的（还没配文的）都算「待整理」，排在墙最前面
  const listUploads = async (wallKey) => {
    if (!SB || !wallKey) return [];
    try {
      const res = await fetch(`${SB.url}/storage/v1/object/list/${SB.bucket}`, {
        method: 'POST',
        headers: sbHeaders(true),
        body: JSON.stringify({ prefix: `${wallKey}/`, limit: 200, sortBy: { column: 'created_at', order: 'desc' } })
      });
      if (!res.ok) return [];
      const rows = await res.json();
      const skip = Array.isArray(SB.skip) ? SB.skip : [];
      return rows
        .filter((r) => r.metadata && /^image\//.test(r.metadata.mimetype || ''))
        .filter((r) => !skip.includes(r.name))
        .map((r) => ({ src: publicUrl(wallKey, r.name), caption: '', fresh: true }));
    } catch {
      return [];
    }
  };

  // 手机原图动不动 5–10MB，先压到长边 1400 再传
  const shrink = (file, max = 1400) => new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const cv = document.createElement('canvas');
      cv.width = Math.round(img.naturalWidth * scale);
      cv.height = Math.round(img.naturalHeight * scale);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(url);
      cv.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/jpeg', 0.84);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('decode failed')); };
    img.src = url;
  });

  const uploadBlob = async (wallKey, blob, idx) => {
    const name = `${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}.jpg`;
    const res = await fetch(`${SB.url}/storage/v1/object/${SB.bucket}/${wallKey}/${name}`, {
      method: 'POST',
      headers: { ...sbHeaders(), 'Content-Type': 'image/jpeg' },
      body: blob
    });
    if (!res.ok) throw new Error(`upload ${res.status}`);
    return publicUrl(wallKey, name);
  };

  const passOk = () => {
    if (!SB.pass) return true;
    try { return localStorage.getItem('od-pass') === String(SB.pass); } catch { return false; }
  };

  let statusTimer = 0;
  let pending = null;
  const setStatus = (text, keep = 0) => {
    clearTimeout(statusTimer);
    if (!text) { panelStatus.hidden = true; panelStatus.textContent = ''; return; }
    panelStatus.hidden = false;
    panelStatus.textContent = text;
    if (keep) statusTimer = setTimeout(() => setStatus(''), keep);
  };

  const makeFigure = (ph) => {
    const fig = document.createElement('figure');
    if (ph.fresh) fig.classList.add('is-new');
    const img = document.createElement('img');
    img.src = ph.src;
    img.alt = ph.caption || '';
    img.loading = 'lazy';
    const cap = document.createElement('figcaption');
    cap.textContent = ph.caption || (ph.fresh ? '刚传上来的' : '');
    fig.append(img);
    if (ph.fresh) {
      const tag = document.createElement('span');
      tag.className = 'tag-new';
      tag.textContent = '待整理';
      fig.appendChild(tag);
    }
    fig.append(cap);
    fig.addEventListener('click', () => {
      viewerImg.src = ph.src;
      viewerImg.alt = ph.caption || '';
      viewerCap.textContent = ph.caption || (ph.fresh ? '还没写配文' : '');
      if (typeof viewer.showModal === 'function') viewer.showModal();
      else viewer.setAttribute('open', '');
    });
    return fig;
  };

  // 空墙：摆几个虚线空相框，点一下就传，比一片黑好看
  const makeEmptySlot = (n) => {
    const fig = document.createElement('figure');
    fig.className = 'ph-empty';
    fig.tabIndex = 0;
    fig.setAttribute('role', 'button');
    fig.setAttribute('aria-label', '选一张照片传上来');
    const plus = document.createElement('span');
    plus.className = 'ph-plus';
    plus.textContent = '＋';
    const cap = document.createElement('figcaption');
    cap.textContent = n === 1 ? '点这里，传第一张' : '再传一张';
    fig.append(plus, cap);
    const go = () => {
      if (panelAdd.hidden) return;
      panelAdd.click();
    };
    fig.addEventListener('click', go);
    fig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
    return fig;
  };

  const doUpload = async (files) => {
    const part = PARTS[opened] || {};
    const wallKey = part.wall;
    if (!SB || !wallKey || !files.length) return;

    if (!passOk()) {
      // 不用 window.prompt：微信内置浏览器会拦掉它
      pending = files;
      passGate.hidden = false;
      passInput.value = '';
      passInput.focus();
      setStatus('');
      return;
    }

    panelAdd.disabled = true;
    let done = 0;
    for (const file of files) {
      setStatus(`正在上传 ${done + 1} / ${files.length}…`);
      try {
        const blob = await shrink(file);
        const src = await uploadBlob(wallKey, blob, done);
        wall.insertBefore(makeFigure({ src, caption: '', fresh: true }), wall.firstChild);
        done += 1;
      } catch {
        setStatus('有一张没传上去，再试一次？', 4000);
        panelAdd.disabled = false;
        panelFile.value = '';
        return;
      }
    }
    setStatus(`传上去 ${done} 张，下次我上线就整理。`, 7000);
    panelAdd.disabled = false;
    panelFile.value = '';
  };

  const openPanel = (i) => {
    opened = i;
    const part = PARTS[i] || {};
    pnKicker.textContent = `第 ${String(i + 1).padStart(2, '0')} 颗星`;
    pnTitle.textContent = part.title || '这颗星';
    pnSub.textContent = part.sub || '';
    wall.innerHTML = '';
    const hasPhotos = Array.isArray(part.photos) && part.photos.length > 0;
    pnNote.textContent = part.empty || '这颗星还没装内容。';
    pnNote.hidden = hasPhotos;
    if (hasPhotos) part.photos.forEach((ph) => wall.appendChild(makeFigure(ph)));
    wall.classList.toggle('is-empty', !hasPhotos);
    if (!hasPhotos && part.wall) {
      for (let k = 1; k <= 4; k += 1) wall.appendChild(makeEmptySlot(k));
    }
    panelAdd.hidden = !(SB && part.wall);
    // 空墙时把「加照片」做得显眼一点
    panelAdd.classList.toggle('is-cta', !hasPhotos);
    setStatus('');
    passGate.hidden = true;
    pending = null;

    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add('in'));

    // 从图床拉「刚传上来、还没配文」的
    if (SB && part.wall) {
      listUploads(part.wall).then((extra) => {
        if (opened !== i || !extra.length) return;
        wall.querySelectorAll('.ph-empty').forEach((el) => el.remove());
        wall.classList.remove('is-empty');
        extra.slice().reverse().forEach((ph) => wall.insertBefore(makeFigure(ph), wall.firstChild));
        pnNote.hidden = true;
        panelAdd.classList.remove('is-cta');
      });
    }
  };

  const backToSky = () => {
    panel.classList.remove('in');
    setTimeout(() => { panel.hidden = true; }, 650);
    stage.style.transition = reduce ? 'none' : 'transform .95s cubic-bezier(.22,.61,.36,1)';
    stage.style.transform = 'none';
    setTimeout(() => {
      busy = false;
      tip.classList.remove('off');
      skyTo.classList.remove('off');
      const n = updateCount();
      if (n >= PARTS.length) showFinale();
    }, 760);
  };

  /* ── 十二颗都摘完 ─────────────────────── */
  const DAY = 86400000;
  const startTime = () => new Date(C.start || '2024-04-14T00:00:00').getTime();
  const dayDiff = (a, b) => Math.max(0, Math.floor((b - a) / DAY));

  // 中间走散过的一段（config 里两个日期都填了才算数）
  const gapDays = () => {
    if (!C.gapFrom || !C.gapTo) return 0;
    const a = new Date(C.gapFrom).getTime();
    const b = new Date(C.gapTo).getTime();
    return Number.isFinite(a) && Number.isFinite(b) && b > a ? dayDiff(a, b) : 0;
  };

  // 真正在一起的天数 = 从起点到今天，减掉走散的那段
  const daysTogether = () => Math.max(0, dayDiff(startTime(), Date.now()) - gapDays());

  const fmtDate = (s) => String(s).slice(0, 10).replace(/-/g, '.');

  const showFinale = () => {
    const target = daysTogether();
    const gap = gapDays();
    const total = dayDiff(startTime(), Date.now());
    if (gap > 0) {
      finaleLine.textContent = `从 ${fmtDate(C.start)} 到现在一共 ${total} 天，减去走散的 ${gap} 天，剩下的都算数。`;
    } else if (C.start) {
      finaleLine.textContent = `从 ${fmtDate(C.start)} 到现在，一共 ${total} 天。`;
    } else {
      finaleLine.textContent = `一共 ${total} 天。`;
    }
    tip.classList.add('off');
    countEl.classList.add('off');
    finale.hidden = false;
    requestAnimationFrame(() => finale.classList.add('in'));
    if (reduce) { finaleNum.textContent = target.toLocaleString('en-US'); return; }
    const t = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min(1, (now - t) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      finaleNum.textContent = Math.round(target * e).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  finaleAgain.addEventListener('click', () => {
    state.forEach((s) => { s.gone = false; s.fall = null; });
    save();
    placeHits();
    updateCount();
    finale.classList.remove('in');
    setTimeout(() => { finale.hidden = true; }, 500);
  });

  closeBtn.addEventListener('click', backToSky);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!panel.hidden) backToSky();
      else if (!finale.hidden) finale.hidden = true;
    }
  });
  document.getElementById('viewerClose').addEventListener('click', () => viewer.close());
  // 点图片以外的地方（也就是那层暗背景）也能关掉，手机上好退
  viewer.addEventListener('click', (e) => {
    if (e.target === viewer) viewer.close();
  });

  // 加照片
  panelAdd.addEventListener('click', () => panelFile.click());
  panelFile.addEventListener('change', () => {
    const picked = panelFile.files ? Array.from(panelFile.files) : [];
    if (picked.length) doUpload(picked);
  });

  // 口令（不用 window.prompt，微信里会被拦）
  passGate.addEventListener('submit', (e) => {
    e.preventDefault();
    if (passInput.value.trim() !== String(SB.pass)) {
      setStatus('口令不对。', 2600);
      passInput.value = '';
      passInput.focus();
      return;
    }
    try { localStorage.setItem('od-pass', String(SB.pass)); } catch {}
    passGate.hidden = true;
    const files = pending;
    pending = null;
    setStatus('');
    if (files) doUpload(files);
  });

  /* ── 主循环 ───────────────────────────── */
  const frame = (now) => {
    const time = (now - t0) / 1000;
    drawSky();
    drawBgStars(time);
    drawLinks();
    for (let i = 0; i < TOTAL; i += 1) drawStar(i, time, now);
    drawShooters();
    if (Math.random() < 0.0009) spawnShooter();
    requestAnimationFrame(frame);
  };

  window.addEventListener('resize', resize);
  if (/[?&]reset=1/.test(location.search)) {
    try { localStorage.removeItem(STORE); } catch {}
  }
  load();
  resize();
  updateCount();
  requestAnimationFrame(frame);
})();
