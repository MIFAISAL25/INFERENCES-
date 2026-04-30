const fs = require('fs');

const content = fs.readFileSync('src/data/blogs.ts', 'utf8');
const lines = content.split('\n');

const indices = [
  5, // praxis
  168, // policy
  239, // reassessing
  302, // moonlighting
  393, // neurodivergence
  474, // governmental
  606, // outsourced
  lines.length - 1 // end of last object
];

const items = [];
for (let i = 0; i < indices.length - 1; i++) {
  // If it's the last element, slice up to the second to last line because the last is "];"
  let end = indices[i+1] - 1;
  let block = lines.slice(indices[i] - 1, end).join('\n');
  items.push(block);
}

// Map the items to their dates
const parsedItems = items.map(block => {
  let idMatch = block.match(/id: "(.*?)"/);
  if (!idMatch) idMatch = block.match(/id:\s*'(.*?)'/);
  const idStr = idMatch ? idMatch[1] : '';

  if (idStr === "reassessing-property-rights") {
    block = block.replace(/date:\s*".*?"/, 'date: "November 2024"');
  }

  let dateMatch = block.match(/date:\s*"(.*?)"/);
  if (!dateMatch) dateMatch = block.match(/date:\s*'(.*?)'/);
  
  if (!dateMatch) {
     console.log("No date found for:\n", block.substring(0, 50));
  }
  
  const ds = dateMatch ? dateMatch[1] : '';
  return { block, id: idStr, dateStr: ds, dateObj: new Date(ds) };
});

parsedItems.sort((a, b) => b.dateObj - a.dateObj);

const header = lines.slice(0, 4).join('\n');
const footer = lines.slice(lines.length - 2).join('\n');

let combinedBlocks = parsedItems.map(x => x.block).join('\n');
// We need to make sure the combined sequence separates items correctly or retains commas if sliced correctly.
// The slice took lines from `  {` to `  },` (or just `  }` for the last one). Let's fix the commas.

let finalArrayItems = parsedItems.map((x, idx) => {
   let b = x.block.trimEnd();
   if (b.endsWith(',')) b = b.slice(0, -1);
   if (idx < parsedItems.length - 1) {
     b = b + ',';
   }
   return b;
});

const newContent = header + '\n' + finalArrayItems.join('\n') + '\n' + footer;
fs.writeFileSync('src/data/blogs_sorted.ts', newContent);
console.log('done writing blogs_sorted.ts');
