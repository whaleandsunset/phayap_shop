# คำถามสัมภาษณ์งาน หมายเลข 01



## เริ่มต้นใช้งาน

เพื่อให้ง่ายต่อการเริ่มต้นใช้งานโปรเจกต์นี้ นี่คือรายการขั้นตอนแนะนำสำหรับผู้เริ่มต้น

ถ้าคุณมีประสบการณ์แล้ว สามารถแก้ไขไฟล์ README.md นี้ให้เหมาะสมกับโปรเจกต์ของคุณได้เลย หรือจะใช้เทมเพลตที่อยู่ด้านล่างก็ได้เช่นกัน

## เพิ่มไฟล์ของคุณ

* [สร้างไฟล์](https://docs.gitlab.com/user/project/repository/web_editor/#create-a-file) หรือ [อัปโหลดไฟล์](https://docs.gitlab.com/user/project/repository/web_editor/#upload-a-file)
* [เพิ่มไฟล์ผ่านคำสั่งบรรทัดคำสั่ง](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) หรือ push repository ที่มีอยู่แล้วด้วยคำสั่งต่อไปนี้:

```
cd existing_repo
git remote add origin https://gitlab.com/whalewithsunset/interview-question-no01.git
git branch -M main
git push -uf origin main
```

## เชื่อมต่อกับเครื่องมือของคุณ

* [ตั้งค่า integrations ของโปรเจกต์](https://gitlab.com/whalewithsunset/interview-question-no01/-/settings/integrations)

## ทำงานร่วมกับทีมของคุณ

* [เชิญสมาชิกในทีมและผู้ร่วมงาน](https://docs.gitlab.com/user/project/members/)
* [สร้าง merge request ใหม่](https://docs.gitlab.com/user/project/merge_requests/creating_merge_requests/)
* [ปิด issue อัตโนมัติจาก merge request](https://docs.gitlab.com/user/project/issues/managing_issues/#closing-issues-automatically)
* [เปิดใช้งานการอนุมัติ merge request](https://docs.gitlab.com/user/project/merge_requests/approvals/)
* [ตั้งค่า auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)

## ทดสอบและดีพลอย

ใช้ระบบ CI/CD ที่มีใน GitLab

* [เริ่มต้นใช้งาน GitLab CI/CD](https://docs.gitlab.com/ci/quick_start/)
* [วิเคราะห์โค้ดเพื่อหาช่องโหว่ด้วย SAST](https://docs.gitlab.com/user/application_security/sast/)
* [ดีพลอยไปยัง Kubernetes, Amazon EC2, หรือ Amazon ECS ด้วย Auto Deploy](https://docs.gitlab.com/topics/autodevops/requirements/)
* [ใช้ pull-based deployments เพื่อจัดการ Kubernetes ได้ดีขึ้น](https://docs.gitlab.com/user/clusters/agent/)
* [ตั้งค่า protected environments](https://docs.gitlab.com/ci/environments/protected_environments/)

***

# แก้ไข README นี้

เมื่อคุณพร้อมที่จะแก้ไข README นี้ให้เหมาะกับโปรเจกต์ของคุณ สามารถแก้ไขไฟล์นี้ได้เลย หรือใช้เทมเพลตด้านล่าง (หรือจะจัดโครงสร้างเองก็ได้)

## ข้อเสนอแนะสำหรับ README ที่ดี

แต่ละโปรเจกต์มีความแตกต่างกัน ลองพิจารณาว่าส่วนใดบ้างที่เหมาะกับโปรเจกต์ของคุณ ส่วนต่าง ๆ ที่ใช้ในเทมเพลตนี้เป็นเพียงข้อเสนอแนะสำหรับโปรเจกต์โอเพ่นซอร์สทั่วไป หากคิดว่า README ยาวเกินไป อาจแยกเอกสารออกไปต่างหากแทนที่จะตัดเนื้อหาออก

## ชื่อโปรเจกต์
เลือกชื่อโปรเจกต์ที่สื่อความหมายได้ด้วยตัวเอง

## คำอธิบาย
อธิบายว่าโปรเจกต์ของคุณสามารถทำอะไรได้บ้าง เพิ่มบริบทและลิงก์อ้างอิงที่เกี่ยวข้อง รายการฟีเจอร์หรือประวัติความเป็นมาก็สามารถใส่ได้ หากมีโปรเจกต์ทางเลือกอื่น ๆ สามารถระบุจุดเด่นที่แตกต่างกันได้ที่นี่

## แสดงสถานะ (Badges)
ใน README บางโปรเจกต์จะมีไอคอนเล็ก ๆ แสดงสถานะ เช่น การทดสอบผ่านหรือไม่ สามารถใช้ Shields เพื่อเพิ่มได้ หลายบริการมีวิธีเพิ่ม badge ให้

## ภาพประกอบ
หากโปรเจกต์ของคุณมีภาพหน้าจอหรือวิดีโอสาธิต ควรใส่ไว้ที่นี่ เช่น GIF หรือใช้ Asciinema สำหรับวิดีโอแบบ command line

## การติดตั้ง
แต่ละ ecosystem อาจมีวิธีติดตั้งที่แตกต่างกัน เช่น Yarn, NuGet, หรือ Homebrew ควรระบุขั้นตอนให้ชัดเจนสำหรับผู้เริ่มต้น หากต้องติดตั้ง dependency หรือมีข้อกำหนดพิเศษ ให้ระบุไว้ด้วย

## วิธีใช้งาน
แสดงตัวอย่างการใช้งาน พร้อมผลลัพธ์ที่คาดหวัง หากตัวอย่างยาวเกินไป อาจลิงก์ไปยังตัวอย่างที่สมบูรณ์แทน

## ขอความช่วยเหลือ
แจ้งช่องทางติดต่อหรือขอความช่วยเหลือ เช่น issue tracker, ห้องแชท, อีเมล ฯลฯ

## Roadmap
หากมีแผนพัฒนาในอนาคต สามารถระบุไว้ที่นี่

## การร่วมพัฒนา
ระบุว่าคุณเปิดรับการร่วมพัฒนาหรือไม่ และมีข้อกำหนดอย่างไร

สำหรับผู้ที่ต้องการแก้ไขโปรเจกต์ ควรมีเอกสารแนะนำขั้นตอนการเริ่มต้น เช่น สคริปต์ที่ต้องรัน หรือ environment variables ที่ต้องตั้งค่า

## ผู้เขียนและการขอบคุณ
ขอบคุณผู้ที่มีส่วนร่วมกับโปรเจกต์นี้

## ใบอนุญาต
สำหรับโปรเจกต์โอเพ่นซอร์ส ควรระบุว่าใช้ไลเซนส์อะไร

## สถานะโปรเจกต์
หากโปรเจกต์หยุดพัฒนา หรือไม่มีเวลาต่อ สามารถแจ้งไว้ที่นี่ เผื่อมีคนสนใจมาช่วยดูแลต่อ
