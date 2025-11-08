#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Web App TypeScript Issues');

// Fix component files with type errors
const fixes = [
  {
    file: 'src/components/achievements/AchievementCard.tsx',
    search: 'achievement.criteria.activity_type',
    replace: 'achievement.criteria.activityType || achievement.criteria.type'
  },
  {
    file: 'src/components/achievements/AchievementCard.tsx', 
    search: 'achievement.criteria.count',
    replace: 'achievement.criteria.value'
  }
];

fixes.forEach(({ file, search, replace }) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(new RegExp(search.replace('.', '\\.'), 'g'), replace);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${file}`);
  }
});

console.log('✅ Web app fixes complete!');
