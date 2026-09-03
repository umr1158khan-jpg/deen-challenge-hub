import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';

const DATA={
Quran:[{q:'قرآن پاک کی کل سورتیں؟',o:['110','114','120'],a:1,e:'قرآن میں 114 سورتیں ہیں',r:'تعارف القرآن'},{q:'سب سے بڑی سورت؟',o:['البقرہ','آل عمران','نساء'],a:0,e:'البقرہ سب سے بڑی ہے',r:'سورہ البقرہ'}],
Seerat:[{q:'نبی ﷺ کی ولادت کہاں؟',o:['مدینہ','مکہ','طائف'],a:1,e:'ولادت مکہ مکرمہ میں',r:'سیرت ابن ہشام'}],
Sahaba:[{q:'پہلے مرد مسلمان؟',o:['حضرت عمر','حضرت ابوبکر','حضرت علی'],a:1,e:'حضرت ابوبکر صدیق',r:'سیرت الصحابہ'}],
};

export default function App(){
const [sc,setSc]=useState('home');
const [cat,setCat]=useState(null);
const [i,setI]=useState(0);
const [sel,setSel]=useState(null);
const [score,setScore]=useState(0);
const [coins,setCoins]=useState(100);
const [show,setShow]=useState(false);

const start=(c)=>{setCat(c);setI(0);setScore(0);setSel(null);setShow(false);setSc('quiz');};
const ans=(idx)=>{
 if(sel!==null)return;
 setSel(idx);setShow(true);
 if(idx===DATA[cat][i].a){setScore(s=>s+1);setCoins(c=>c+10);}
};
const next=()=>{
 if(i+1<DATA[cat].length){setI(i+1);setSel(null);setShow(false);}
 else setSc('result');
};

const q=cat?DATA[cat][i]:null;

return(
<View style={s.bg}>
<View style={s.header}>
<Text style={s.logo}>🕌 Deen Challenge Hub</Text>
<View style={s.row}><Text style={s.badge}>⭐ Lvl 5</Text><Text style={s.badge}>💰 {coins}</Text></View>
</View>

{sc==='home'&&(
<ScrollView style={s.body}>
<Text style={s.h1}>السلام علیکم 👋</Text>
<Text style={s.p}>آج کون سا چیلنج؟</Text>
{Object.keys(DATA).map(c=>(
<TouchableOpacity key={c} style={s.card} onPress={()=>start(c)}>
<Text style={s.cardI}>{c==='Quran'?'📖':c==='Seerat'?'🌙':'👥'}</Text>
<Text style={s.cardT}>{c}</Text>
<Text style={s.arrow}>→</Text>
</TouchableOpacity>
))}
</ScrollView>
)}

{sc==='quiz'&&q&&(
<View style={s.body}>
<Text style={s.qc}>سوال {i+1}/{DATA[cat].length}</Text>
<Text style={s.q}>{q.q}</Text>
{q.o.map((op,idx)=>{
 let bg='#1e293b';
 if(show){if(idx===q.a)bg='#16a34a';else if(idx===sel)bg='#dc2626';}
 return <TouchableOpacity key={idx} style={[s.opt,{backgroundColor:bg}]} onPress={()=>ans(idx)}><Text style={s.optT}>{op}</Text></TouchableOpacity>
})}
{show&&(
<View style={s.exp}>
<Text style={s.expH}>{sel===q.a?'✅ درست! +10':'❌ غلط'}</Text>
<Text style={s.expT}>💡 {q.e}</Text>
<Text style={s.ref}>📚 {q.r}</Text>
<TouchableOpacity style={s.btn} onPress={next}><Text style={s.btnT}>اگلا →</Text></TouchableOpacity>
</View>
)}
</View>
)}

{sc==='result'&&(
<View style={s.center}>
<Text style={{fontSize:60}}>🏆</Text>
<Text style={s.h1}>ماشاءاللہ!</Text>
<Text style={s.p}>سکور: {score}/{DATA[cat].length}</Text>
<Text style={s.coins}>💰 {coins} Coins</Text>
<TouchableOpacity style={s.btn} onPress={()=>setSc('home')}><Text style={s.btnT}>ہوم</Text></TouchableOpacity>
</View>
)}
</View>
);
}

const s=StyleSheet.create({
bg:{flex:1,backgroundColor:'#0f172a'},
header:{paddingTop:50,paddingBottom:20,paddingHorizontal:20,backgroundColor:'#1e293b',borderBottomLeftRadius:20,borderBottomRightRadius:20},
logo:{color:'#fff',fontSize:19,fontWeight:'bold'},
row:{flexDirection:'row',gap:8,marginTop:10},
badge:{color:'#fbbf24',backgroundColor:'#334155',paddingHorizontal:10,paddingVertical:5,borderRadius:15,fontSize:12,overflow:'hidden'},
body:{flex:1,padding:20},
center:{flex:1,justifyContent:'center',alignItems:'center',padding:20},
h1:{color:'#fff',fontSize:22,fontWeight:'bold'},
p:{color:'#94a3b8',marginTop:5,marginBottom:15},
card:{flexDirection:'row',alignItems:'center',backgroundColor:'#1e293b',padding:16,borderRadius:14,marginBottom:12},
cardI:{fontSize:24,marginRight:12},
cardT:{color:'#fff',fontSize:16,fontWeight:'bold',flex:1},
arrow:{color:'#64748b'},
qc:{color:'#94a3b8',fontSize:12,marginBottom:8},
q:{color:'#fff',fontSize:18,fontWeight:'bold',textAlign:'right',marginBottom:15},
opt:{padding:14,borderRadius:10,marginBottom:8},
optT:{color:'#fff',textAlign:'center'},
exp:{backgroundColor:'#1e293b',padding:14,borderRadius:12,marginTop:10},
expH:{color:'#22c55e',fontWeight:'bold',marginBottom:6},
expT:{color:'#fff',fontSize:13},
ref:{color:'#94a3b8',fontSize:11,marginTop:5,marginBottom:10},
btn:{backgroundColor:'#2563eb',padding:12,borderRadius:10,alignItems:'center',marginTop:10},
btnT:{color:'#fff',fontWeight:'bold'},
coins:{color:'#fbbf24',fontSize:16,fontWeight:'bold',marginVertical:10}
});