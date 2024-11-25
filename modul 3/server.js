const express = require("express"); 
const app = express();
const PORT = 5501; 
const cors = require('cors');
app.use(cors());
app.use(express.json());


let groups = [
  {
    group_name: "wonderland",
    student1: { student_name: "Muhamad Rafif Rahmatullah", student_id: "101012330311", student_class: "TT-47-04" },
    student2: { student_name: "Dafa Aulia Putera", student_id: "101012330144", student_class: "TT-47-06" },
    student3: { student_name: "Yassmin Syaharah Juliaman", student_id: "1301223459", student_class: "IF-46-12" },
    student4: { student_name: "Qonia", student_id: "101012", student_class: "TT-47-03" },
  },
];

//buat mendapatkan semua grup
app.get("/groups", (req, res) => {
  res.json(groups); // return
});

//grup berdasarkan nama
app.get("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const group = groups.find((g) => g.group_name === groupName);
  if (!group) return res.status(404).json({ error: "Group not found" }); 
  res.json(group);
});

// untuk menambah grup baru
app.post("/groups", (req, res) => {
  const { group_name, student1, student2, student3, student4 } = req.body;

  if (!group_name) {
    return res.status(400).json({ error: "Group name is required" }); 
  }

  const newGroup = { group_name, student1, student2, student3, student4 };
  groups.push(newGroup);
  res.status(201).json(newGroup);
});

// ntuk memperbarui grup berdasarkan nama
app.put("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const { group_name, student1, student2, student3, student4 } = req.body;

  const group = groups.find((g) => g.group_name === groupName);
  if (!group) return res.status(404).json({ error: "Group not found" });

  if (group_name) group.group_name = group_name;
  if (student1) group.student1 = student1;
  if (student2) group.student2 = student2;
  if (student3) group.student3 = student3;
  if (student4) group.student4 = student4;

  res.json(group);
});

//untuk menghapus grup berdasarkan nama
app.delete("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const groupIndex = groups.findIndex((g) => g.group_name === groupName);

  if (groupIndex === -1) {
    return res.status(404).json({ error: "Group not found" });
  }

  //hapus grup dari array
  groups.splice(groupIndex, 1);

  res.status(200).json({
    message: `The Group "${groupName}" has been deleted successfully.`,
    remaining_groups: groups,
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
