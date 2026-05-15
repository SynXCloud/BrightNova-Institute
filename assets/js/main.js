        // Custom Cursor
        const cursorDot = document.getElementById('cursor-dot');
        const cursorRing = document.getElementById('cursor-ring');

        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Subtle delay for the ring
            setTimeout(() => {
                cursorRing.style.left = `${posX}px`;
                cursorRing.style.top = `${posY}px`;
            }, 50);
        });

        // Add hover effect to interactive elements
        function initInteractiveCursor() {
            const interactiveElements = document.querySelectorAll('a, button, .interactive, input, select, textarea');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorRing.style.backgroundColor = 'rgba(245, 166, 35, 0.1)';
                });
                el.addEventListener('mouseleave', () => {
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorRing.style.backgroundColor = 'transparent';
                });
            });
        }
        initInteractiveCursor();

        // Notice Ticker
        const tickerMessages = [
            "🔥 JEE Mains 2024 Result: 47 Students in Top 1000!",
            "📢 Admission Open for 2025-26 Batch — Limited Seats!",
            "🏆 NEET 2024: Priya Sharma AIR 34 — APEX Academy",
            "⏰ Free Demo Class: Register by Sunday",
            "🎯 Scholarship Test: 15th December — Apply Now"
        ];
        
        const tickerContent = document.getElementById('tickerContent');
        
        tickerMessages.forEach((msg, idx) => {
            const div = document.createElement('div');
            div.className = `ticker-item ${idx === 0 ? 'active' : ''}`;
            div.innerHTML = msg;
            tickerContent.appendChild(div);
        });

        let currentTicker = 0;
        const tickerItems = document.querySelectorAll('.ticker-item');
        
        setInterval(() => {
            if (tickerItems.length > 0) {
                tickerItems[currentTicker].classList.remove('active');
                currentTicker = (currentTicker + 1) % tickerItems.length;
                tickerItems[currentTicker].classList.add('active');
            }
        }, 4000);

        // Navbar Scroll Effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile Menu Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navLinksItems = document.querySelectorAll('.nav-links li');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const isOpen = navLinks.classList.contains('open');
            mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            
            if (isOpen) {
                navLinksItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`;
                });
            } else {
                navLinksItems.forEach(item => {
                    item.style.transitionDelay = '0s';
                });
            }
        });

        // Close mobile menu on link click
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Particle Canvas
        const canvas = document.getElementById('particleCanvas');
        if(canvas) {
            const ctx = canvas.getContext('2d');
            let width, height;

            function resize() {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            const particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 2,
                    speedY: Math.random() * -0.5 - 0.1,
                    opacity: Math.random()
                });
            }

            function drawParticles() {
                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = '#00D4FF';
                
                particles.forEach(p => {
                    ctx.globalAlpha = p.opacity;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fill();
                    
                    p.y += p.speedY;
                    if (p.y < 0) {
                        p.y = height;
                        p.x = Math.random() * width;
                    }
                });
                requestAnimationFrame(drawParticles);
            }
            drawParticles();
        }

        // Typewriter Effect
        const subtitles = [
            "47 JEE Top 1000 Rankers",
            "112 NEET Qualifiers",
            "89% Board First Division",
            "₹2.5Cr Scholarships Awarded"
        ];
        let subIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        const typewriterEl = document.getElementById('typewriter');

        function type() {
            if(!typewriterEl) return;
            const currentText = subtitles[subIdx];
            
            if (isDeleting) {
                typewriterEl.textContent = currentText.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typewriterEl.textContent = currentText.substring(0, charIdx + 1);
                charIdx++;
            }

            let speed = isDeleting ? 50 : 100;

            if (!isDeleting && charIdx === currentText.length) {
                speed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                subIdx = (subIdx + 1) % subtitles.length;
                speed = 500; // Pause before new word
            }

            setTimeout(type, speed);
        }
        setTimeout(type, 1000);

        // Intersection Observer for Animations
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('stat-card')) {
                        entry.target.classList.add('visible');
                        const numberEl = entry.target.querySelector('.stat-number');
                        const target = parseInt(numberEl.getAttribute('data-target'));
                        const suffix = numberEl.getAttribute('data-suffix') || '';
                        
                        let count = 0;
                        const increment = target / 50;
                        const updateCount = () => {
                            count += increment;
                            if (count < target) {
                                numberEl.textContent = Math.ceil(count) + suffix;
                                requestAnimationFrame(updateCount);
                            } else {
                                numberEl.textContent = target + suffix;
                            }
                        };
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                    
                    if (entry.target.classList.contains('progress-bar')) {
                        const targetWidth = entry.target.style.width;
                        entry.target.style.width = '0';
                        setTimeout(() => {
                            entry.target.style.width = targetWidth;
                        }, 100);
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.stat-card, .progress-bar').forEach(el => observer.observe(el));

        // Leaderboard Data
        const leaderboardData = [
            { name: 'Karan Singh', exam: 'JEE Mains', score: '99.98%ile', stream: 'PCM', type: 'jee', badge: '🥇 Top 100' },
            { name: 'Aditi Rao', exam: 'NEET', score: '695/720', stream: 'PCB', type: 'neet', badge: '⚡ 99+ Percentile' },
            { name: 'Vikram Das', exam: 'UPSC Prelims', score: 'Cleared', stream: 'Arts', type: 'upsc', badge: '🎯 First Attempt' },
            { name: 'Megha Gupta', exam: 'CBSE 12th', score: '98.6%', stream: 'PCM', type: 'board', badge: '🔥 School Topper' },
            { name: 'Rohan Sharma', exam: 'JEE Adv', score: 'AIR 342', stream: 'PCM', type: 'jee', badge: '⚡ 99+ Percentile' },
            { name: 'Priya Verma', exam: 'NEET', score: '680/720', stream: 'PCB', type: 'neet', badge: '🔥 Scholarship Winner' },
            { name: 'Ananya Patil', exam: 'ICSE 10th', score: '99.2%', stream: 'Foundation', type: 'board', badge: '🥇 Full Marks Math' },
            { name: 'Siddharth Jain', exam: 'JEE Mains', score: '99.91%ile', stream: 'PCM', type: 'jee', badge: '⚡ 99+ Percentile' }
        ];

        const tbody = document.getElementById('leaderboardBody');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('leaderboardSearch');

        function renderTable(data) {
            if(!tbody) return;
            tbody.innerHTML = '';
            data.forEach((row, idx) => {
                const tr = document.createElement('tr');
                tr.style.animationDelay = `\${idx * 0.1}s`;
                tr.innerHTML = `
                    <td class="rank-col">#\${idx + 4}</td>
                    <td><strong>\${row.name}</strong><br><small style="color:var(--text-muted)">\${row.stream}</small></td>
                    <td>\${row.exam}</td>
                    <td class="score-col">\${row.score}</td>
                    <td class="badge-col"><span>\${row.badge}</span></td>
                \`;
                tbody.appendChild(tr);
            });
            initInteractiveCursor();
        }

        if(tbody) renderTable(leaderboardData);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                const searchVal = searchInput ? searchInput.value.toLowerCase() : '';
                
                let filtered = leaderboardData;
                if (filter !== 'all') filtered = filtered.filter(d => d.type === filter);
                if (searchVal) filtered = filtered.filter(d => d.name.toLowerCase().includes(searchVal));
                
                renderTable(filtered);
            });
        });

        if(searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchVal = e.target.value.toLowerCase();
                const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                
                let filtered = leaderboardData;
                if (activeFilter !== 'all') filtered = filtered.filter(d => d.type === activeFilter);
                if (searchVal) filtered = filtered.filter(d => d.name.toLowerCase().includes(searchVal));
                
                renderTable(filtered);
            });
        }

        // Courses Data
        const coursesData = {
            jee: [
                { title: "JEE Mains + Advanced 2-Year", duration: "24 Months", mode: "Offline/Hybrid", start: "15 April", size: "40", seats: 34, totalSeats: 50, fee: "1,20,000", oldFee: "1,50,000", popular: true },
                { title: "JEE Dropper Batch", duration: "10 Months", mode: "Offline", start: "20 May", size: "45", seats: 12, totalSeats: 45, fee: "85,000", oldFee: "1,10,000", popular: false },
                { title: "JEE Crash Course", duration: "3 Months", mode: "Online", start: "1 Jan", size: "100", seats: 89, totalSeats: 100, fee: "25,000", oldFee: "35,000", popular: false }
            ],
            neet: [
                { title: "NEET UG 2-Year Program", duration: "24 Months", mode: "Offline/Hybrid", start: "15 April", size: "50", seats: 48, totalSeats: 50, fee: "1,15,000", oldFee: "1,40,000", popular: true },
                { title: "NEET Repeater Batch", duration: "10 Months", mode: "Offline", start: "25 May", size: "45", seats: 20, totalSeats: 45, fee: "80,000", oldFee: "1,05,000", popular: false },
                { title: "NEET Crash Course", duration: "3 Months", mode: "Online", start: "1 Jan", size: "100", seats: 45, totalSeats: 100, fee: "22,000", oldFee: "30,000", popular: false }
            ],
            upsc: [
                { title: "UPSC GS Foundation", duration: "12 Months", mode: "Hybrid", start: "10 June", size: "60", seats: 15, totalSeats: 60, fee: "95,000", oldFee: "1,20,000", popular: true },
                { title: "UPSC Prelims Crash", duration: "4 Months", mode: "Online", start: "1 Feb", size: "200", seats: 150, totalSeats: 200, fee: "18,000", oldFee: "25,000", popular: false },
                { title: "CSAT Special Batch", duration: "2 Months", mode: "Online", start: "1 March", size: "100", seats: 30, totalSeats: 100, fee: "10,000", oldFee: "15,000", popular: false }
            ],
            foundation: [
                { title: "Class 10th Board + NTSE", duration: "12 Months", mode: "Offline", start: "5 April", size: "30", seats: 28, totalSeats: 30, fee: "45,000", oldFee: "60,000", popular: true },
                { title: "Class 9th Foundation", duration: "12 Months", mode: "Offline", start: "5 April", size: "35", seats: 15, totalSeats: 35, fee: "40,000", oldFee: "55,000", popular: false },
                { title: "Class 8th Olympiad Prep", duration: "12 Months", mode: "Hybrid", start: "10 April", size: "40", seats: 10, totalSeats: 40, fee: "35,000", oldFee: "45,000", popular: false }
            ],
            crash: [
                { title: "JEE Mains Crash Course", duration: "3 Months", mode: "Online", start: "1 Jan", size: "100", seats: 89, totalSeats: 100, fee: "25,000", oldFee: "35,000", popular: true },
                { title: "NEET Crash Course", duration: "3 Months", mode: "Online", start: "1 Jan", size: "100", seats: 45, totalSeats: 100, fee: "22,000", oldFee: "30,000", popular: false },
                { title: "CUET Fast-Track", duration: "2 Months", mode: "Hybrid", start: "15 March", size: "80", seats: 20, totalSeats: 80, fee: "15,000", oldFee: "20,000", popular: false }
            ]
        };

        const coursesGrid = document.getElementById('coursesGrid');
        const courseTabs = document.querySelectorAll('.tab-btn');

        function renderCourses(category) {
            if(!coursesGrid) return;
            coursesGrid.innerHTML = '';
            const data = coursesData[category];
            
            data.forEach((course, idx) => {
                const fillPercent = (course.seats / course.totalSeats) * 100;
                let colorClass = category === 'jee' ? '#00D4FF' : category === 'neet' ? '#10B981' : category === 'upsc' ? '#8B5CF6' : '#F5A623';
                
                const card = document.createElement('div');
                card.className = 'course-card';
                card.style.animationDelay = \`\${idx * 0.1}s\`;
                card.innerHTML = \`
                    <div class="course-glow" style="background: \${colorClass}; box-shadow: 0 0 15px \${colorClass}"></div>
                    \${course.popular ? '<div class="badge-popular">Popular</div>' : ''}
                    <div class="course-header">
                        <div class="exam-badge" style="color: \${colorClass}; background: \${colorClass}22">\${category.toUpperCase()}</div>
                        <h3 class="course-title">\${course.title}</h3>
                        <div class="course-details-grid">
                            <div class="detail-item"><i class="far fa-clock"></i> \${course.duration}</div>
                            <div class="detail-item"><i class="fas fa-desktop"></i> \${course.mode}</div>
                            <div class="detail-item"><i class="far fa-calendar-alt"></i> \${course.start}</div>
                            <div class="detail-item"><i class="fas fa-users"></i> Batch: \${course.size}</div>
                        </div>
                    </div>
                    <div class="course-body">
                        <ul class="feature-list">
                            <li><i class="fas fa-check-circle"></i> Live & Recorded Classes</li>
                            <li><i class="fas fa-check-circle"></i> Weekly Mock Tests</li>
                            <li><i class="fas fa-check-circle"></i> 24/7 Doubt Resolution</li>
                            <li><i class="fas fa-check-circle"></i> Printed Study Material</li>
                        </ul>
                        <div class="seats-container">
                            <div class="seats-text">
                                <span>Seats Filling Fast!</span>
                                <span>\${course.seats}/\${course.totalSeats} Filled</span>
                            </div>
                            <div class="seats-bg">
                                <div class="seats-bar" style="width: \${fillPercent}%; background: \${fillPercent > 80 ? '#EF4444' : '#F5A623'}"></div>
                            </div>
                        </div>
                    </div>
                    <div class="course-footer">
                        <div class="course-fee">
                            <span class="fee-current">₹\${course.fee}</span>
                            <span class="fee-original">₹\${course.oldFee}</span>
                        </div>
                        <div class="course-actions">
                            <a href="#admission" class="btn btn-primary interactive">Enroll Now</a>
                            <a href="#" class="btn btn-outline interactive">Syllabus</a>
                        </div>
                    </div>
                \`;
                coursesGrid.appendChild(card);
            });
            initInteractiveCursor();
        }

        if(coursesGrid) renderCourses('foundation');

        courseTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                courseTabs.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderCourses(btn.getAttribute('data-tab'));
            });
        });

        // Scholarship Calculator Logic
        let currentStep = 1;
        const totalSteps = 4;
        const nextBtns = document.querySelectorAll('.calc-next');
        const prevBtns = document.querySelectorAll('.calc-prev');
        const submitBtn = document.querySelector('.calc-submit');
        const resetBtn = document.querySelector('.calc-reset');
        const progressBar = document.getElementById('calcProgressBar');
        
        function updateCalcStep(step) {
            document.querySelectorAll('.calc-step').forEach(el => el.classList.remove('active'));
            document.getElementById(\`calc-step-\${step}\`).classList.add('active');
            progressBar.style.width = \`\${(step / totalSteps) * 100}%\`;
        }

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if(currentStep < totalSteps) {
                    currentStep++;
                    updateCalcStep(currentStep);
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if(currentStep > 1) {
                    currentStep--;
                    updateCalcStep(currentStep);
                }
            });
        });

        if(submitBtn) {
            submitBtn.addEventListener('click', () => {
                const score = parseFloat(document.getElementById('calcScore').value) || 0;
                const incomeRadio = document.querySelector('input[name="income"]:checked');
                const income = incomeRadio ? incomeRadio.value : 'above8';
                const category = document.getElementById('calcCategory').value;
                
                let scholarship = 0;
                
                // Base scholarship on score
                if(score >= 95) scholarship += 50;
                else if(score >= 90) scholarship += 30;
                else if(score >= 80) scholarship += 15;
                
                // Income bump
                if(income === 'below3') scholarship += 20;
                else if(income === '3to8') scholarship += 10;
                
                // Category bump
                if(category === 'scst') scholarship += 15;
                else if(category === 'obc' || category === 'ews') scholarship += 5;
                
                scholarship = Math.min(scholarship, 100); // Max 100%
                
                let badge = 'Bronze';
                let color = '#CD7F32';
                if(scholarship >= 80) { badge = 'Full'; color = '#00D4FF'; }
                else if(scholarship >= 50) { badge = 'Gold'; color = '#F5A623'; }
                else if(scholarship >= 25) { badge = 'Silver'; color = '#C0C0C0'; }
                
                const savings = Math.floor((120000 * scholarship) / 100); // Assuming avg fee 1.2L
                
                document.querySelector('.calc-form').style.display = 'none';
                const resultDiv = document.getElementById('calcResult');
                resultDiv.style.display = 'block';
                
                document.getElementById('resultBadge').textContent = \`\${badge} Scholarship\`;
                document.getElementById('resultBadge').style.background = \`linear-gradient(135deg, \${color}, #000)\`;
                document.getElementById('resultBadge').style.color = '#fff';
                
                document.getElementById('resultPercent').textContent = \`You qualify for \${scholarship}% scholarship!\`;
                document.getElementById('resultSaved').textContent = \`You save approx ₹\${savings.toLocaleString()}!\`;
                
                setTimeout(() => {
                    document.getElementById('resultBar').style.width = \`\${scholarship}%\`;
                }, 100);
            });
        }

        if(resetBtn) {
            resetBtn.addEventListener('click', () => {
                document.getElementById('calcResult').style.display = 'none';
                document.querySelector('.calc-form').style.display = 'block';
                currentStep = 1;
                updateCalcStep(currentStep);
                document.getElementById('calcScore').value = '';
            });
        // Dashboard Animations (Observer)
        const dashObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    if(entry.target.classList.contains('circular-progress')) {
                        const target = entry.target.getAttribute('data-percent');
                        const circle = entry.target.querySelector('.progress');
                        const text = entry.target.querySelector('.score-num');
                        
                        setTimeout(() => {
                            circle.style.strokeDashoffset = 283 - (283 * target) / 100;
                            let count = 0;
                            const update = () => {
                                count += parseInt(target) / 50;
                                if(count < target) {
                                    text.textContent = Math.ceil(count);
                                    requestAnimationFrame(update);
                                } else {
                                    text.textContent = target;
                                }
                            };
                            update();
                        }, 500);
                        dashObserver.unobserve(entry.target);
                    }
                    if(entry.target.classList.contains('bar-col')) {
                        const bar = entry.target.querySelector('.bar');
                        const h = bar.style.height;
                        bar.style.height = '0';
                        setTimeout(() => { bar.style.height = h; }, 500);
                        dashObserver.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.circular-progress, .bar-col').forEach(el => dashObserver.observe(el));

        // Mock Test Logic
        const mockQuestions = [
            {
                q: "A particle is moving in a circular path of radius r with a constant speed v. What is the magnitude of its average acceleration over half a revolution?",
                opts: ["0", "v²/r", "2v²/πr", "v²/πr"],
                ans: 2
            },
            {
                q: "Which of the following compounds will show geometric isomerism?",
                opts: ["2-butene", "Propene", "1-butene", "2-methyl-2-butene"],
                ans: 0
            },
            {
                q: "Let f(x) = |x - 1| + |x - 2|. The minimum value of f(x) is:",
                opts: ["0", "1", "2", "3"],
                ans: 1
            },
            {
                q: "In Young's double slit experiment, if the separation between the slits is halved and the distance to the screen is doubled, the fringe width becomes:",
                opts: ["Half", "Double", "Four times", "One-fourth"],
                ans: 2
            },
            {
                q: "The standard electrode potential for the half-cell reactions are given... (sample text)",
                opts: ["A", "B", "C", "D"],
                ans: 0
            }
        ];

        let currentQ = 0;
        let testState = Array(5).fill('notvis'); // notvis, unans, ans, mark
        let userAnswers = Array(5).fill(null);
        let timerInterval;
        let timeLeft = 600; // 10 mins

        const qText = document.getElementById('qText');
        const qOptions = document.getElementById('qOptions');
        const paletteGrid = document.getElementById('paletteGrid');
        const qNumDisplay = document.getElementById('qNumDisplay');

        function formatTime(s) {
            const m = Math.floor(s / 60);
            const sec = s % 60;
            return \`\${m.toString().padStart(2,'0')}:\${sec.toString().padStart(2,'0')}\`;
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                if(timeLeft <= 0) {
                    clearInterval(timerInterval);
                    submitTest();
                } else {
                    timeLeft--;
                    const t = document.getElementById('mockTimer');
                    if(t) t.textContent = formatTime(timeLeft);
                }
            }, 1000);
        }

        function renderPalette() {
            if(!paletteGrid) return;
            paletteGrid.innerHTML = '';
            for(let i=0; i<5; i++) {
                const btn = document.createElement('button');
                btn.className = \`palette-btn interactive \${testState[i]} \${i === currentQ ? 'active' : ''}\`;
                btn.textContent = i + 1;
                btn.onclick = () => loadQuestion(i);
                paletteGrid.appendChild(btn);
            }
            initInteractiveCursor();
        }

        function loadQuestion(idx) {
            if(testState[currentQ] === 'notvis') testState[currentQ] = 'unans';
            currentQ = idx;
            if(testState[currentQ] === 'notvis') testState[currentQ] = 'unans';
            
            if(qNumDisplay) qNumDisplay.textContent = \`Question \${idx + 1}\`;
            if(qText) qText.innerHTML = mockQuestions[idx].q;
            
            if(qOptions) {
                qOptions.innerHTML = '';
                const labels = ['A', 'B', 'C', 'D'];
                mockQuestions[idx].opts.forEach((opt, i) => {
                    const div = document.createElement('div');
                    div.className = \`option-item interactive \${userAnswers[idx] === i ? 'selected' : ''}\`;
                    div.innerHTML = \`
                        <div class="option-marker">\${labels[i]}</div>
                        <div class="option-text">\${opt}</div>
                    \`;
                    div.onclick = () => {
                        userAnswers[idx] = i;
                        testState[idx] = 'ans';
                        loadQuestion(idx); // re-render to show selection
                    };
                    qOptions.appendChild(div);
                });
            }
            renderPalette();
            initInteractiveCursor();
        }

        const btnPrev = document.getElementById('btnPrev');
        const btnNext = document.getElementById('btnNext');
        const btnMark = document.getElementById('btnMark');
        const btnSubmitTest = document.getElementById('btnSubmitTest');

        if(btnPrev) {
            btnPrev.addEventListener('click', () => {
                if(currentQ > 0) loadQuestion(currentQ - 1);
            });
            btnNext.addEventListener('click', () => {
                if(userAnswers[currentQ] !== null) testState[currentQ] = 'ans';
                if(currentQ < 4) loadQuestion(currentQ + 1);
            });
            btnMark.addEventListener('click', () => {
                testState[currentQ] = 'mark';
                if(currentQ < 4) loadQuestion(currentQ + 1);
                else renderPalette();
            });
            btnSubmitTest.addEventListener('click', submitTest);
        }

        function submitTest() {
            clearInterval(timerInterval);
            document.getElementById('mockContainer').style.display = 'none';
            document.getElementById('mockResult').style.display = 'block';
            
            let correct = 0;
            let wrong = 0;
            let unans = 0;
            
            for(let i=0; i<5; i++) {
                if(userAnswers[i] === null) unans++;
                else if(userAnswers[i] === mockQuestions[i].ans) correct++;
                else wrong++;
            }
            
            const score = Math.max(0, (correct * 4) - wrong);
            document.getElementById('finalScore').textContent = \`\${score}/20\`;
            
            const timeTaken = 600 - timeLeft;
            document.getElementById('resTime').textContent = formatTime(timeTaken);
            document.getElementById('resCorrect').textContent = correct;
            document.getElementById('resWrong').textContent = wrong;
            document.getElementById('resUnatt').textContent = unans;
            
            // Animation for rank
            const rankEl = document.querySelector('.result-rank-box strong');
            let dummy = 1000;
            const rankInt = setInterval(() => {
                dummy -= 50;
                rankEl.textContent = \`#\${dummy}\`;
                if(dummy <= 42) {
                    clearInterval(rankInt);
                    rankEl.textContent = '#42';
                }
            }, 50);
        }

        // Initialize Test if present
        if(document.getElementById('mockContainer')) {
            startTimer();
            loadQuestion(0);
        }


// Admission Form Logic
function nextFormStep(step) {
    document.querySelectorAll('.form-step').forEach(el => el.style.display = 'none');
    document.getElementById(`formStep${step}`).style.display = 'block';
}

function prevFormStep(step) {
    document.querySelectorAll('.form-step').forEach(el => el.style.display = 'none');
    document.getElementById(`formStep${step}`).style.display = 'block';
}

const admissionForm = document.getElementById('admissionForm');
if(admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        document.querySelectorAll('.form-step').forEach(el => el.style.display = 'none');
        document.getElementById('formSuccess').style.display = 'block';
        addXP(50, "Application Submitted!");
    });
}

function resetForm() {
    if(admissionForm) admissionForm.reset();
    document.getElementById('formSuccess').style.display = 'none';
    document.getElementById('formStep1').style.display = 'block';
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all others
        document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
        
        if(!isActive) {
            item.classList.add('active');
        }
    });
});

// Gamification Logic
let userXP = 0;
let unlockedAchievements = new Set();

function addXP(amount, reason) {
    userXP += amount;
    const xpAmountEl = document.querySelector('.xp-amount');
    const xpLabelEl = document.querySelector('.xp-label');
    
    if(xpAmountEl) {
        // Animate count up
        let start = userXP - amount;
        const duration = 1000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = amount / steps;
        
        const counter = setInterval(() => {
            start += increment;
            if(start >= userXP) {
                clearInterval(counter);
                start = userXP;
            }
            xpAmountEl.textContent = `${Math.floor(start)} XP`;
        }, stepTime);
    }
    
    if(xpLabelEl) {
        xpLabelEl.textContent = reason;
        setTimeout(() => {
            xpLabelEl.textContent = "Keep Exploring!";
        }, 3000);
    }
}

function showToast(title, message) {
    const toast = document.getElementById('achievementToast');
    const msgEl = document.getElementById('toastMessage');
    const titleEl = toast.querySelector('h4');
    
    if(toast && msgEl) {
        titleEl.textContent = title;
        msgEl.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

function unlockAchievement(id, title, message, xp) {
    if(!unlockedAchievements.has(id)) {
        unlockedAchievements.add(id);
        showToast(title, message);
        setTimeout(() => addXP(xp, `Achievement: ${title}`), 1000);
    }
}

// Scroll Achievements
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollPos / docHeight) * 100;
    
    if(scrollPos > 500) unlockAchievement('explorer', 'Curious Explorer', 'Scrolled past hero section', 10);
    if(scrollPercent > 50) unlockAchievement('halfway', 'Halfway There', 'Explored 50% of the site', 20);
    if(scrollPercent > 90) unlockAchievement('scholar', 'Determined Scholar', 'Read all the details', 50);
});

// Tab Clicks Achievement
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        unlockAchievement('researcher', 'Active Researcher', 'Checked different courses', 15);
    });
});
