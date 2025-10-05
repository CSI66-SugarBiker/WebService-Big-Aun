import { connectDB } from '../src/config/db.js';
import Branch from '../src/models/Branch.js';
import User from '../src/models/User.js';
import MenuItem from '../src/models/MenuItem.js';
import { hash } from '../src/utils/hash.js';

async function run() {
  await connectDB();
  const branch = await Branch.create({
    name:'สาขาอโศก',
    address:'Bangkok',
    theme: {
      primary:'#3B82F6', secondary:'#22C55E', altBlack:'#111827', altWhite:'#F9FAFB',
      accents:['#10B981','#F59E0B','#8B5CF6']
    },
    payment: { promptpayId: process.env.PROMPTPAY_ID || '0123456789012' }
  });

  await User.create({
    branchId: branch._id,
    name:'Owner',
    email:'owner@pos.local',
    passwordHash: await hash('owner123'),
    role:'owner'
  });

  await MenuItem.insertMany([
    { branchId:branch._id, name:'ข้าวกะเพรา', price:75, category:'จานหลัก', station:'Wok', modifiers:[], isActive:true },
    { branchId:branch._id, name:'สลัดรวม', price:85, category:'สลัด', station:'Cold',
      modifiers:[
        { id:'no', type:'multi', label:'ไม่ใส่', items:[{name:'มะเขือเทศ'},{name:'หัวหอม'}]},
        { id:'extra', type:'multiPrice', label:'เพิ่ม', items:[{name:'ข้าวโพด',price:10},{name:'ชีส',price:15}]}
      ],
      isActive:true
    }
  ]);

  console.log('Seed OK');
  process.exit(0);
}
run();
