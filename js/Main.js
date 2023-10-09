// Inputs
let Name_Prod = document.querySelector('.input_Name')

let Prices = document.querySelector('.Prices')
let Taxes = document.querySelector('.Taxes')
let Ads = document.querySelector('.Ads')
let Discount = document.querySelector('.Discount')

let Count = document.querySelector('.Count')
let Total = document.querySelector('.Total')
let Category = document.querySelector('.Category')
let Btn_Create = document.querySelector('.Create')
let Search = document.querySelector('.Search')
let Delte_All = document.querySelector('.Delte_All')
let Category_Btn = document.querySelector('.Category_Btn')
let Title_Btn = document.querySelector('.Title_Btn')



// Get Price Function
function Get_Price() {
    if (Prices.value !== '') {
        let Total_Price = (+Prices.value + +Taxes.value + +Ads.value) - +Discount.value
        Total.innerHTML = Total_Price
        document.querySelector('.parent_total p ').style.background = '#009688'
    }
    else {
        Total.innerHTML = ''
        document.querySelector('.parent_total p ').style.background = '#d40a0a'
    }
}

let Data_Store;
let Stats = 'Create'

// Bridge Update
let Bridge;

if (localStorage.getItem('Product') !== null) {
    Data_Store = JSON.parse(localStorage.getItem('Product'))
    Display_Data()
} else {
    Name_Prod.focus()
    Data_Store = []
}



// Get User Data Function
Btn_Create.addEventListener('click', () => {
    if (Name_Prod.value !== '' && Prices.value !== '') {
        let User_Data = {
            Name: Name_Prod.value.toLowerCase(),
            Price: Prices.value,
            Taxes: Taxes.value,
            Ads: Ads.value,
            Descount: Discount.value,
            Count: Count.value,
            Total: Total.innerHTML,
            Category: Category.value.toLowerCase(),
        }
        // Mood Creator
        if (Stats === 'Create') {
            if (User_Data.Count > 1) {
                for (let i = 0; i < User_Data.Count; i++) {
                    Data_Store.push(User_Data)
                }
            } else {
                Data_Store.push(User_Data)
            }
        }
        else if (Stats = 'Update') {
            Data_Store[Bridge] = User_Data
            Count.style.display = 'block'
            Btn_Create.innerHTML = 'Create'
            Btn_Create.style.background = '#009688'
        }
        localStorage.setItem('Product', JSON.stringify(Data_Store))
        Display_Data()
    }
    Empty_inputs()

    scrollTo({
        bottom: 0,
        behavior: "smooth"
    })
})



// Empty Inputs Function
function Empty_inputs() {
    document.querySelectorAll('input').forEach((e) => {
        e.value = ''
    })
    Total.innerHTML = ''
    document.querySelector('.parent_total p ').style.background = '#d40a0a'
}



// Display Data Function 
function Display_Data() {
    let Container = '';
    for (let i = 0; i < Data_Store.length; i++) {
        Container += `
            <tr>
            <td>${i + 1}</td>
            <td>${Data_Store[i].Name}</td>
            <td>${Data_Store[i].Price}</td>
            <td>${Data_Store[i].Taxes}</td>
            <td>${Data_Store[i].Ads}</td>
            <td>${Data_Store[i].Descount}</td>
            <td>${Data_Store[i].Total}</td>
            <td>${Data_Store[i].Category}</td>
            <td><button class="Update" onclick='Update(${i})'>Update</button></td>
            <td><button class="Delete" onclick='Delete_Item(${i})'>Delete</button></td>
            </tr>
        `
    }
    document.querySelector('#Display_Data').innerHTML = Container

    if (Data_Store.length >= 1) {
        Delte_All.innerHTML = `Delete All (${Data_Store.length})`
        Delte_All.style.display = 'block'
    }
    else {
        Delte_All.style.display = 'none'
    }
}

// Delete Item Function 
function Delete_Item(index) {
    Data_Store.splice(index, 1)
    localStorage.setItem('Product', JSON.stringify(Data_Store))
    Display_Data()
}

// Delete All Items Function
Delte_All.addEventListener('click', () => {
    let Delete = prompt('Do You Want Delte All Items')
    if (Delete === 'ok') {
        localStorage.clear()
        Data_Store.splice(0)
        Display_Data()
    }
})

// Update Item Function 
function Update(Index) {
    Name_Prod.value = Data_Store[Index].Name
    Prices.value = Data_Store[Index].Price
    Taxes.value = Data_Store[Index].Taxes
    Ads.value = Data_Store[Index].Ads
    Discount.value = Data_Store[Index].Descount
    Total.innerHTML = Data_Store[Index].Total
    Category.value = Data_Store[Index].Category

    // Change Stats Update & Create
    Stats = 'Update'
    if (Stats === 'Update') {
        Count.style.display = 'none'
        Btn_Create.innerHTML = 'Update'
        Btn_Create.style.background = '#113946'
        Get_Price()
    }
    Bridge = Index
    scrollTo({
        top : 0,
        behavior: "smooth"
    })
    Name_Prod.focus()
}

//Search Function 
let Switch;
if (Switch === undefined) {
    Search.placeholder = "Choose First 'Search By Title & Category"
    Search.setAttribute('disabled', '')
}
function Switch_Serach(value_Switch) {
    if (value_Switch === 'Title') {
        Switch = 'Title'
        Search.placeholder = 'Search By Title'
    }
    else {
        Switch = 'Category'
        Search.placeholder = 'Search By Category'
    }

    if (Switch !== undefined) {
        Search.removeAttribute('disabled')
    }
}


Search.addEventListener('input', (e) => {
    let Container = '';
    if (Switch === 'Title') {
        for (let i = 0; i < Data_Store.length; i++) {
            if (Data_Store[i].Name.includes(e.target.value.toLowerCase())) {

                Container += `
                <tr>
                <td>${i + 1}</td>
                <td>${Data_Store[i].Name}</td>
                <td>${Data_Store[i].Price}</td>
                <td>${Data_Store[i].Taxes}</td>
                <td>${Data_Store[i].Ads}</td>
                <td>${Data_Store[i].Descount}</td>
                <td>${Data_Store[i].Total}</td>
                <td>${Data_Store[i].Category}</td>
                <td><button class="Update" onclick='Update(${i})'>Update</button></td>
                <td><button class="Delete" onclick='Delete_Item(${i})'>Delete</button></td>
                </tr>`
                console.log(Data_Store[i]);
            }
            else {
                // console.log(Data_Store[i]);
            }
        }
        document.querySelector('#Display_Data').innerHTML = Container
    }
    else if (Switch === 'Category') {
        let Container = '';
        for (let i = 0; i < Data_Store.length; i++) {
            if (Data_Store[i].Category.includes(e.target.value.toLowerCase())) {
                Container += `
                <tr>
                <td>${i + 1}</td>
                <td>${Data_Store[i].Name}</td>
                <td>${Data_Store[i].Price}</td>
                <td>${Data_Store[i].Taxes}</td>
                <td>${Data_Store[i].Ads}</td>
                <td>${Data_Store[i].Descount}</td>
                <td>${Data_Store[i].Total}</td>
                <td>${Data_Store[i].Category}</td>
                <td><button class="Update" onclick='Update(${i})'>Update</button></td>
                <td><button class="Delete" onclick='Delete_Item(${i})'>Delete</button></td>
                </tr>
            `
            }
            else {
                Display_Data()
            }
        }
        document.querySelector('#Display_Data').innerHTML = Container
    }
})
