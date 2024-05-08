![image](https://github.com/namanh2310/Mathematics-Application/assets/101866057/6b7a9aa3-4ab3-47d5-9a16-75b5c51ab1b4)
# AiMA - An AI-Based Mobile System to Assist College Students with Math-Related Issues

As technology continues to progress, the importance and influence of mathematics in people's lives are growing. The emergence of mobile systems has brought about several benefits, such as portability, convenience, and accessibility, especially in the field of education. It is crucial to develop a mobile system that can cater not only to high school students but also to those enrolled in colleges and universities, offering solutions for basic calculations and highly specialized algorithms. To address this need, this research presents AiMA, an AI-based mobile system that assists college students with math-related issues. In this paper, we discuss the limitations of current math-solving mobile applications and propose a solution that caters to specialized algorithms for university students. AiMA employs React Native on the front-end side to render the user interface and Flask-server on the back-end side to handle numerical data. Additionally, an AI model is implemented to handle input images stored in a cloud-based media management platform for detection. The system's functionality evaluation indicates that AiMA provides advantages over existing solutions by enabling users to solve complex calculus problems and receive tailored solutions for specific areas of mathematics. This makes AiMA a highly valuable tool for college and university students who require specialized assistance with their math-related studies.

**1. Software requirements**
- Window terminal
- Git
- Visual Studio Code
- Python (v.3.10.4)

**2. Setup server**

- Changing directory
```
cd test-server
```
- Installing all requirements
```
pip install -r requirements.txt
```
- Running the server
```
python "app.py"
```
Note that, you should run the server after the client is run.

**3. Setup client**
- Installing NodeJS: https://nodejs.org/en
- Installing Java SE Development Kit (JDK): React Native requires Java SE Development Kit (JDK), which can be easily installed using Chocolatey. If you followed the NodeJS installation guide above, Chocolatey should've been installed automatically. To install JDK open the terminal as an administrator and type 
```
choco install -y openjdk8
```
- Installing Android Studio: https://developer.android.com/studio?hl=vi, for detailed instructions, you should watch this video: https://www.youtube.com/watch?v=oorfevovPWw&t=603s
- Installing React Native CLI
In Powershell, you type
```
npx react-native
```
- Initializing Your First Project (for checking)
```
npx react-native init YourFirstRNProject
```

Now move on to the downloaded folder

- Changing directory
```
cd client
```

- Installing all modules
```
npm install
```

Before running the project, you should run android simulator from Android Studio, then

- Running the project
```
npm start
```

**4. Appendix**
You can access these links for detailed instructions:
- React Native setup: "https://www.youtube.com/watch?v=oorfevovPWw&t=603s"
- Flask setup: "https://www.youtube.com/watch?v=GHvj1ivQ7ms"

**5. Demo**
![image](https://github.com/namanh2310/Mathematics-Application/assets/101866057/28ecfb9b-2dfc-47bd-9408-fcfb8b5d25e7)
![image](https://github.com/namanh2310/Mathematics-Application/assets/101866057/88cc8c42-df7a-46a9-9cc1-ea5d8946cbdd)
![image](https://github.com/namanh2310/Mathematics-Application/assets/101866057/85f54165-8c8c-4463-89f3-a21caacc2e93)
![image](https://github.com/namanh2310/Mathematics-Application/assets/101866057/b4f9e288-42d5-44d8-a7b4-8274373ba256)
![image](https://github.com/namanh2310/Mathematics-Application/assets/101866057/543c7c9d-45bd-4cd3-af7f-9f78655bb7ee)
![image](https://github.com/namanh2310/Mathematics-Application/assets/101866057/172b9d9e-5008-4695-a8c7-508d9796abbd)
