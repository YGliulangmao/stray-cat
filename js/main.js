document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formName = this.getAttribute('name') || 'form';
            
            console.log(`Form "${formName}" submitted with:`, Object.fromEntries(formData));
            
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success';
            successMessage.textContent = '感谢您的申请！我们会尽快给您回复';
            
            const formParent = this.parentElement;
            formParent.insertBefore(successMessage, this);
            
            this.reset();
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-detail-btn')) {
            e.preventDefault();
            const petId = e.target.getAttribute('data-pet-id');
            showPetDetail(petId);
        }
        
        if (e.target.closest('#pet-filter')) {
            const form = e.target.closest('form');
            if (form) {
                e.preventDefault();
                filterPets(new FormData(form));
            }
        }
    });
    
    initFilterForm();

});


const petData = {
    'lele': {
        id: 'lele',
        name: '乐乐',
        age: '2岁',
        gender: '公',
        breed: '拉布拉多混血',
        description: '非常友善活泼的拉布拉多混血犬，喜欢玩球和游泳。已绝育，疫苗齐全。适合有儿童的家庭。',
        health: '已绝育 • 已接种疫苗 • 定期驱虫',
        personality: '活泼、友善、聪明',
        habits: '喜欢玩球、爱游泳、不挑食',
    },
    'mimi': {
        id: 'mimi',
        name: '咪咪',
        age: '1岁',
        gender: '母',
        breed: '短毛家猫',
        description: '温顺亲人的短毛猫，会用猫砂，喜欢被抚摸。已绝育，疫苗齐全。适合初次养猫的人。',
        health: '已绝育 • 已接种疫苗 • 体内外驱虫',
        personality: '温顺、亲人、安静',
        habits: '喜欢晒太阳、会用猫抓板',
    },
    'dahuang': {
        id: 'dahuang',
        name: '大黄',
        age: '3岁',
        gender: '公',
        breed: '比格犬',
        description: '温顺可靠的比格犬，经过基本服从训练，适合有养狗经验的家庭。特别适合有儿童的家庭。',
        health: '已绝育 • 已接种疫苗',
        personality: '温顺、忠诚、稳重',
        habits: '喜欢散步、不吠叫、不拆家',
    },
    'xiaohua': {
        id: 'xiaohua',
        name: '小花',
        age: '8个月',
        gender: '母',
        breed: '三花猫',
        description: '活泼可爱的三花小猫，好奇心强，喜欢玩耍。已绝育，疫苗齐全。',
        health: '已绝育 • 已接种疫苗',
        personality: '活泼、好奇、聪明',
        habits: '喜欢追逐玩具、爱爬高',
    },
    'juzi': {
        id: 'juzi',
        name: '橘子',
        age: '2岁',
        gender: '公',
        breed: '橘猫',
        description: '典型的橘猫性格，贪吃爱睡，脾气好。已绝育，疫苗齐全。适合喜欢安静的人。',
        health: '已绝育 • 已接种疫苗',
        personality: '温顺、慵懒、亲人',
        habits: '爱吃、爱睡觉、喜欢被摸肚子',
    },
    'xiaohei': {
        id: 'xiaohei',
        name: '小黑',
        age: '1岁',
        gender: '公',
        breed: '中华田园犬',
        description: '聪明忠诚的黑色田园犬，警惕性高但很亲人。已绝育，疫苗齐全。适合看家护院。',
        health: '已绝育 • 已接种疫苗 • 定期驱虫',
        personality: '聪明、忠诚、警惕',
        habits: '喜欢巡逻、对陌生人会吠叫、护主'
    },
    'doudou': {
        id: 'doudou',
        name: '豆豆',
        age: '4岁',
        gender: '母',
        breed: '泰迪犬',
        description: '温顺亲人的泰迪犬，毛发卷曲柔软，已经过专业美容训练。特别适合作为陪伴犬。',
        health: '已绝育 • 已接种疫苗 • 定期美容',
        personality: '温顺、亲人、聪明',
        habits: '喜欢被梳理毛发、不吵闹、会简单指令',
    },
    
    'xiaobai': {
        id: 'xiaobai',
        name: '小白',
        age: '1岁',
        gender: '母',
        breed: '垂耳兔',
        description: '温顺安静的垂耳兔，性格温和，适合作为家庭宠物。已经过健康检查。',
        health: '已绝育 • 健康检查完成',
        personality: '安静、温顺、胆小',
        habits: '喜欢吃干草、会使用兔厕所',
    },
    
    'afu': {
        id: 'afu',
        name: '阿福',
        age: '5岁',
        gender: '公',
        breed: '金毛犬',
        description: '友善温顺的金毛犬，曾是导盲犬培训学员，性格极其稳定，适合各种家庭环境。',
        health: '已绝育 • 已接种疫苗 • 芯片植入',
        personality: '友善、温顺、耐心',
        habits: '喜欢捡球、爱游泳、对儿童特别友好',
    }
};


function showPetDetail(petId) {
    const pet = petData[petId];
    if (!pet) return;
    
    const modalHTML = `
        <div class="modal active" id="pet-modal">  <!-- 这里直接添加active类 -->
            <div class="modal-content">
                <button class="close-btn">&times;</button>
                <h2>${pet.name}</h2>
                <div class="pet-info">
                    <p><strong>年龄:</strong> ${pet.age}</p>
                    <p><strong>性别:</strong> ${pet.gender}</p>
                    <p><strong>品种:</strong> ${pet.breed}</p>
                    <p><strong>健康状况:</strong> ${pet.health}</p>
                    <p><strong>性格:</strong> ${pet.personality}</p>
                    <p><strong>描述:</strong> ${pet.description}</p>
                </div>
                <div class="modal-footer">
                    <a href="adoption-process.html?pet=${pet.id}" class="btn">申请领养</a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    document.querySelector('#pet-modal .close-btn').addEventListener('click', closeModal);
    
    document.getElementById('pet-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('pet-modal');
    if (modal) {
        modal.remove();
    }
}

function closeModal() {
    const modal = document.getElementById('pet-modal');
    if (modal) modal.remove();
}

function initFilterForm() {
    const form = document.getElementById('pet-filter');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            filterPets(new FormData(form));
        });
    }
}

function filterPets(formData) {
    const type = formData.get('type');
    const age = formData.get('age');
    const gender = formData.get('gender');
    
    console.log('应用筛选条件:', {type, age, gender});
    
    alert(`已应用筛选条件:\n种类: ${type || '全部'}\n年龄: ${age || '全部'}\n性别: ${gender || '全部'}`);
}
