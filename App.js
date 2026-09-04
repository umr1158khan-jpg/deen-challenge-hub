import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';

const DATA = {
  Quran: [
    { q: "قرآن پاک میں کتنی سورتیں ہیں؟", o: ["112", "114", "116"], a: 1, exp: "قرآن میں 114 سورتیں ہیں۔", ref: "المصحف" },
    { q: "سب سے لمبی سورت کونسی ہے؟", o: ["البقرہ", "آل عمران", "النساء"], a: 0, exp: "سورۃ البقرہ سب سے لمبی ہے۔", ref: "تفسیر" },
    { q: "قرآن میں کتنے پارے ہیں؟", o: ["30", "40", "20"], a: 0, exp: "قرآن میں 30 پارے ہیں۔", ref: "معلومات" },
  ],
  Seerat: [
    { q: "پہلی وحی کہاں نازل ہوئی؟", o: ["غار حرا", "غار ثور", "بدر"], a: 0, exp: "غار حرا میں پہلی وحی نازل ہوئی۔", ref: "سیرت" },
    { q: "ولادت کس سال ہوئی؟", o: ["570ء", "571ء", "575ء"], a: 1, exp: "571ء عام الفیل میں ولادت ہوئی۔", ref: "سیرت النبی" },
  ],
  Sahaba: [
    { q: "پہلے خلیفہ کون تھے؟", o: ["حضرت عمرؓ", "حضرت ابوبکرؓ", "حضرت عثمانؓ"], a: 1, exp: "حضرت ابوبکر صدیقؓ پہلے خلیفہ تھے۔", ref: "تاریخ الخلفاء" },
  ]
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const [cat, setCat] = useState(null);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(10);
  const [sel, setSel] = useState(null);

  const start = (c) => { setCat(c); setIdx(0); setScore(0); setSel(null); setScreen('quiz'); };
  const handle = (i) => { if(sel!==null) return; setSel(i); if(i===DATA[cat][idx].a){ setScore(s=>s+1); setCoins(c=>c+5); } };

  return (
    <View style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1220"/>
      <View style={s.header}>
        <Text style={s.salam}>السلام علیکم</Text>
        <Text style={s.guest}>Guest • umr1158khan@gmail.com</Text>
        <View style={s.row}>
          <View style={s.badge}><Text style={s.bText}>⭐ LEVEL 1</Text></View>
          <View style={s.badge}><Text style={s.bText}>🪙 {coins} COINS</Text></View>
        </View>
      </View>

      {screen==='home' && (
        <ScrollView style={{padding:16}}>
          <View style={s.daily}>
            <Text style={s.d1}>DAILY CHALLENGE</Text>
            <Text style={s.d2}>New questions every day</Text>
            <TouchableOpacity style={s.dailyBtn} onPress={()=>start('Quran')}><Text style={s.dailyBtnT}>Play Daily</Text></TouchableOpacity>
          </View>
          <Text style={s.secTitle}>Choose a Category</Text>
          {Object.keys(DATA).map(c=>(
            <TouchableOpacity key={c} style={s.catCard} onPress={()=>start(c)}>
              <Text style={s.catIcon}>{c==='Quran'?'📖':c==='Seerat'?'⭐':'🕌'}</Text>
              <View><Text style={s.catName}>{c}</Text><Text style={s.catLen}>{DATA[c].length} Qs • 30 XP</Text></View>
              <Text style={s.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {screen==='quiz' && (
        <View style={{padding:20, flex:1}}>
          <View style={s.track}><View style={[s.fill,{width:`${((idx+1)/DATA[cat].length)*100}%`}]} /></View>
          <Text style={s.q}>{DATA[cat][idx].q}</Text>
          {DATA[cat][idx].o.map((o,i)=>{
            let st=s.opt;
            if(sel!==null){ if(i===DATA[cat][idx].a) st=s.optOk; else if(i===sel) st=s.optNo; }
            return <TouchableOpacity key={i} style={st} onPress={()=>handle(i)}><Text style={s.optT}>{o}</Text></TouchableOpacity>
          })}
          {sel!==null && (
            <View style={s.exp}>
              <Text style={s.expT}>{DATA[cat][idx].exp} - {DATA[cat][idx].ref}</Text>
              <TouchableOpacity style={s.next} onPress={()=>{ if(idx+1<DATA[cat].length){setIdx(idx+1); setSel(null)} else setScreen('result')}}><Text style={s.nextT}>{idx+1===DATA[cat].length?'Result':'اگلا →'}</Text></TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {screen==='result' && (
        <View style={{padding:20, flex:1, justifyContent:'center'}}>
          <View style={s.res}><Text style={{fontSize:50, textAlign:'center'}}>🏆</Text><Text style={s.resS}>{score}/{DATA[cat].length}</Text><Text style={s.resSub}>ماشاءاللہ {score*30} XP</Text><TouchableOpacity style={s.home} onPress={()=>setScreen('home')}><Text style={s.homeT}>Home جائیں</Text></TouchableOpacity></View>
        </View>
      )}
    </View>
  )
}

const s=StyleSheet.create({
  safe:{flex:1, backgroundColor:'#0B1220'},
  header:{backgroundColor:'#111A2E', padding:20, paddingTop:50, borderBottomLeftRadius:24, borderBottomRightRadius:24},
  salam:{color:'#7C8DB0', fontSize:11, fontWeight:'800'},
  guest:{color:'white', fontWeight:'700', marginTop:6, fontSize:12},
  row:{flexDirection:'row', marginTop:14, gap:10},
  badge:{backgroundColor:'#1E293B', borderWidth:1, borderColor:'#2D3A55', paddingHorizontal:12, paddingVertical:7, borderRadius:20},
  bText:{color:'#FACC15', fontSize:11, fontWeight:'900'},
  daily:{backgroundColor:'#151F38', borderWidth:1, borderColor:'#1E2E4F', borderRadius:18, padding:18, marginBottom:18},
  d1:{color:'#FACC15', fontSize:10, fontWeight:'900'}, d2:{color:'white', fontWeight:'700', marginTop:6},
  dailyBtn:{backgroundColor:'#FACC15', paddingHorizontal:18, paddingVertical:9, borderRadius:20, marginTop:12, alignSelf:'flex-start'},
  dailyBtnT:{color:'#0B1220', fontWeight:'900', fontSize:12},
  secTitle:{color:'white', fontWeight:'800', marginBottom:12},
  catCard:{backgroundColor:'#151F38', borderWidth:1, borderColor:'#1E2E4F', flexDirection:'row', alignItems:'center', padding:16, borderRadius:16, marginBottom:10},
  catIcon:{fontSize:20, backgroundColor:'#1E293B', padding:10, borderRadius:12, marginRight:12},
  catName:{color:'white', fontWeight:'800'}, catLen:{color:'#7C8DB0', fontSize:11, marginTop:3},
  arrow:{marginLeft:'auto', color:'#3A4A6B', fontSize:22},
  track:{height:6, backgroundColor:'#1E293B', borderRadius:10, overflow:'hidden'}, fill:{height:'100%', backgroundColor:'#FACC15'},
  q:{color:'white', fontSize:20, fontWeight:'800', textAlign:'right', marginTop:20, marginBottom:18, lineHeight:30},
  opt:{backgroundColor:'#151F38', borderWidth:1, borderColor:'#1E2E4F', padding:15, borderRadius:14, marginBottom:10},
  optOk:{backgroundColor:'#052e16', borderColor:'#16a34a', borderWidth:1.5, padding:15, borderRadius:14, marginBottom:10},
  optNo:{backgroundColor:'#450a0a', borderColor:'#ef4444', borderWidth:1.5, padding:15, borderRadius:14, marginBottom:10},
  optT:{color:'white', textAlign:'center', fontWeight:'600'},
  exp:{backgroundColor:'#1E293B', borderRadius:16, padding:14, marginTop:12}, expT:{color:'#CBD5E1', textAlign:'right'},
  next:{backgroundColor:'white', padding:12, borderRadius:12, marginTop:12}, nextT:{color:'#0B1220', textAlign:'center', fontWeight:'900'},
  res:{backgroundColor:'#151F38', borderRadius:20, padding:24, borderWidth:1, borderColor:'#1E2E4F', alignItems:'center'},
  resS:{color:'#FACC15', fontSize:36, fontWeight:'900', marginTop:10, textAlign:'center'},
  resSub:{color:'#94A3B8', marginTop:6},
  home:{backgroundColor:'#FACC15', paddingHorizontal:24, paddingVertical:12, borderRadius:20, marginTop:16}, homeT:{color:'#0B1220', fontWeight:'900'}
});
