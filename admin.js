async function loadMessages() {
    try {
        const response = await fetch("http://localhost:5000/api/contact");
        const data = await response.json();

        const table = document.getElementById("tableData");

        data.forEach(item => {
            table.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.message}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}

loadMessages();