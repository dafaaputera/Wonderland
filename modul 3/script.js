const fetchGroups = async () => {
    try {
        // Ganti URL ini sesuai dengan port backend kamu
        const response = await fetch('http://localhost:5501/groups');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Groups fetched:', data); // Debugging: log data ke console
        displayGroups(data);
    } catch (error) {
        console.error('Error fetching groups:', error);
    }
};

const displayGroups = (groups) => {
    const groupContainer = document.getElementById('group-container');
    groupContainer.innerHTML = ''; // Kosongkan kontainer sebelum menampilkan data baru

    groups.forEach(group => {
        // Membuat elemen untuk setiap grup
        const groupCard = document.createElement('div');
        groupCard.classList.add('group-card');

        // Tambahkan nama grup
        const groupTitle = document.createElement('h2');
        groupTitle.textContent = group.group_name;
        groupCard.appendChild(groupTitle);

        // Tambahkan anggota grup
        const students = [group.student1, group.student2, group.student3, group.student4];
        students.forEach((student, index) => {
            if (student) {
                const studentInfo = document.createElement('p');
                studentInfo.textContent = `Anggota ${index + 1}: ${student.student_name}, ID: ${student.student_id}, Kelas: ${student.student_class}`;
                groupCard.appendChild(studentInfo);
            }
        });

        // Tambahkan kartu grup ke kontainer
        groupContainer.appendChild(groupCard);
    });
};

// Jalankan fetch ketika halaman dimuat
window.onload = fetchGroups;
