# Shell Command

### Redirection

#### Redirection: > (write to file)

- '>'를 사용하면 stdout의 내용을 파일에 적기 가능
- ex) head -n 10 file.a > fire.b

#### Redirection: < (read from file)

- '<'를 사용하면 file의 내용을 읽어올 수 있다.
- ex) head -n 10 < file.a

#### Redirection: | (Pipelining)

- Unix Commands를 연결 해준다
- 다음 프로그램으로 다음 단계의 결과를 넘겨줌
- head -n 10 file.a | wc -|

#### Executable script : chmod +x

- Script를 실행 가능한 파일로 바꿔줌

#### SubSehlls

- $()을 통해서 새로운 process를 생성하여 subshell 구성
- 결과는 stdout에 저장
- ex) $VAR=$(ls "*.txt)

#### Loop

- for in do done 구문

```
for file in *.csv; do
    convert $file "$(basename $file .csv).txt"
done
```

#### cat

- cat은 하나 이상의 파일 이름을 입력으로 받아 화면에 그 내용들을 출력하는 기능
- -s : 줄 사이에 빈 칸이 반복되면 이를 한 줄로 줄인다.
- -n : 줄에 IDE처럼 숫자를 부여한다.

#### 명령어

- CTRL + R : 이전 명령어
- CTRL + L : 클리어
- CTRL + A : 라인 시작 커서 이동
- CTRL + E : 라인의 끝으로 커서 이동

#### 이전 명령어 : !!

#### Braces : echo

- echo는 받은 인자들을 화면으로 출력하는 기능

#### 유명 쉘커맨드 모음

```
ls : 이 기능은 list의 약자로 디렉토리 안의 파일과 디렉토리의 목록을 화면에 출력
    - ls -al : 모든 정보 출력
    - ls - : HOME 정보 확인
    - ls dic/*.txt txt정보 확인
    - ls -rot : 역순으로 정렬
    -a : 숨김파일까지 포함해 디렉토리 안의 모든 파일이 출력된다.
    -t : 목록을 출력할 때, 수정 시간 순으로 정렬해서 출력한다.
    -l : 단순히 파일의 이름만 아니라 이들에 대한 자세한 정보를 출력한다.

cd : 원하는 경로로 커서(working directory)를 이동
    - cd ..
    - cd -

rm : remove
    - rm -rf : 파일 제거 기능

cat : 파일출력
    - cat -n : 라인 숫자 출력

head, tail : 파일 시작/끝 부분만 출력
    - head -n 10 [FILE] : n개 수만큼 출력

wget : 웹 파일 다운 로드

wc : word count, 파일 라인, 단어, 바이트 수를 셀수 있음

mkdir : mkdir는 ‘make directory’의 약자로 디렉토리를 만듬
```

```
grep : 특정 패턴을 가진 파일을 색인

- # gene을 가진 모든 line을 print
- $ grep “gene” file.gtf

- # "gene"을 가진 모든 line을 print
- $ grep “\"gene\"” file.gtf

- # 특정 패턴 제외
- $ grep -v “gene” file.gtf

- # Only matched parts만 출력한다 (Line 전체 출력 X)
- $ grep -o “gene” file.gtf

- # 대소문자 구분 X
- $ grep -i “gene” file.gtf

- # 이전 줄 확인 가능
- $ grep -B 1 “gene” file.gtf
```

```
chmod : 파일 권한 주기
join : 중복되는 부분을 > 이후에 저장 (-a 붙이면 반대)
-  join file1.sorted file2.sorted > file3
tr : 특정 문자를 대체
- echo "abced" | tr 'bc' '12'
````

#### pwd 

- ‘print working directory’의 약자로 현재 쉘 상에서 내가 위치한 디렉토리 경로 ($ pwd)

#### mkdir 

- make a directory ($ mkdir [DIR])

#### mv 

- ‘move’의 약자로 파일이나 폴더를 다른 곳으로 이동
- 파일 이름을 바꿀 때도 사용 가능하다 ($ mv [FROM] [TO])

#### cp 

- cp는 ‘copy’의 약자로 파일이나 디렉토리를 복사 ($ cp [FROM] [TO])

#### top 

- show running processes, 실행 프로그램 확인 ($ top)

#### touch 

- creates an empty file ($ touch [FILE])

#### man 

- manual of any command, command의 help page를 보여준다 ($ man [command])

#### which 

- 프로그램 경로 (path) 확인 ($ which [프로그램명])

#### vi 

- open interactive text editor($ vi [FILE])

#### diff 

- compare two files

#### ps 

- list running processes, 현재 동작하는 process 확인 가능 ($ ps -ef)

### kill 

- kill running process, 특정 process 중단 가능 ($ kill -9 [PID])

### rm

- rm는 ‘remove’, 즉 ‘지우다’의 약자로 파일이나 디렉토리를 삭제
-r : 'recursive'의 약자로, 디렉토리를 삭제할 때 그 안의 있는 파일이나 디렉토리까지 재귀적으로 모두 삭제할 것을 지정함.
-f : 'force'의 약자. 지우는 것은 신중해야 하기 때문에 사용자가 파일이 많은 디렉토리를 삭제할 때는 실수로 중요한 파일을 지울 수도 있음. 따라서 'rm'는 디렉토리 안의 파일마다 삭제할 것인지 yes/no 로 묻는데 이 옵션을 쓰면 묻지 않고 강제로 전부 삭제함.



Spring 배포할때 자주 보던것
```
ps -ef | grep jar 프로세스 서버확인
sudo kill -9 2101 서버죽이기
sudo nohup java -jar 파일명.jar
sudo vi nohup.out ec2 실시간 로그
```

### 오늘의 메인 : 쉘 스크립트 return문은 다른 프로그래밍 언어의 return문과 무슨 차이가 있나요?

https://youtu.be/3ArYMq5AomI?t=579

- 쉘에서는 return 반환값이 없다
- 쉘에서는 return 값이 EXIT_STATUS로 전달, `$?`로 확인 가능
- EXIT_STATUS에서 0은 성공 1 ~ 255는 에러
- shell로 변수나 값 가져오기 가능 - 이는 부모 shell에는 영향을 안줌

방법 1 - Echo 전달 [일반적인 방법]

```
foo() { 
    val="test" 
    echo ${val} 
} 

# 함수 foo 호출의 결과를 변수에 넣는다. 

retval=$(foo) 

echo ${retval}

```

=> test 출력

방법 2 - 전역 변수 공유

```
retval="" 

foo() { 
    retval="test" 
} 

foo 

echo ${retval}
```

=> test 출력

방법 3 - return 으로 전달 (exit status)

- 이 방법은 정수(0~255)만 전달 가능 (사실상 에러 코드를 반환하는 것이다.)

```
foo() { 
    return 123 
} 

foo 

echo $?

```

만약 문자열 리턴?

- numeric argument required 라는 에러 메시지를 출력하며 $?(종료 스테이터스) 에는 "2" 가 출력되는 것을 확인할 수 있음

출처: https://young-cow.tistory.com/34 [어린소]