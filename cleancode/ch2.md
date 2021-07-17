# Chapter2 의미 있는 이름

### 의도를 분명히 밝혀라

```
ex)

public List<int []> getThem() {
    List<int[]> list1 = new ArrayList<int[]>();
    for(int[] x : theList)
        if(x[0] == 4)
            list1.add(x);
    return list1;
}

--------------------------------------------------------------

now)

public List<Cell> getFlaggedCells() {
    List<Cell> flaggedCells = new ArrayList<Cell>();
    for (Cell cell : gameBoard)
        if(cell.isFlagged())
            flaggedCells.add(cell);
    return flaggedCells;
}

```

이름을 명시적으로 작성하여 함수의 역할을 명확히 표시할것

###  그릇된 정보를 피하라

```
XYZController & ForEfficientHandlingOfStrings ---- XYZControllerForEfficientStorageOfStrings 이 두 메소드 이름은 서로를 헷갈릴 수 있음
```

```
int a = 1
int (O == 1)
a = O1;
```

일관성이 떨어지는 메소드 =  <b>그릇된 정보</b> (사용 유의 할 것)

### 의미 있게 구분하라

```
getActiveAccount();
getActiveAccounts();
getActiveAccountInfo();
```

위 세가지의 메소드는 차이가 크게 발생하지 않음
-> 읽는 사람이 차이를 알도록 이름을 지어야 함

### 발음하기 쉬운 이름을 사용해야함

genymdhms - 이런 변수를 구어체로 부르기 어려운 이름
generationTimestamp 같은 변수는 읽기가 쉬움

### 검색하기 쉬운 이름을 사용하라

1. 검색하기 쉬운 이름이 상수보다 좋음
2. <b>이름의 길이는 범위의 크기에 비례해야 함</b>

```
bad code

for(int j = 0; j < 34; j++) {
    s += (t[j]*4) /5;
}

good code

int realDaysPerIdealDay = 4;
const int WORK_DAYS_PER_WEEK = 5;
int sum = 0;
for (int j = 0; j < NUMBER_OF_TASKS; j++) {
    int realTaskDays = taskEstimate[j] * realDaysPerIdeaDay;
    int realTaskWeeks = (realTaskDays / WORK_DAYS_PER_WEEK);
    sum += realTaskWeeks;
}

아래 코드는 검색 가능
위 코드는 검색 불가능

```

### 인코딩을 피하라

변수 이름에 접두어를 붙일 필요 없다.

##### 멤버 변수 접두어

멤버 변수에 m_같은 접두어를 붙일 필요가 없다

##### 인터페이스 클래스 & 구현 클래스

인터페이스 클래스나 구현 클래스 등을 구분하기 위해서 굳이 접두어를 붙이는 건 좋지 않음 -> 만약 구분이 필요하다면 구현 클래스에 Imp를 붙이는게 좋다

### 자신의 기억력을 자랑하지 마라

일반적으로 사용하지 않는 변수를 선택한다면 생기는 문제

 ** <b>명료함이 가장 중요</b> **

### 클래스 이름

Customer, Wikipage 처럼 쓰고, Manager, Processor, Data, Info 등은 피하라

명사나 명사구가 좋고 동사구는 피하라

### 메서드 이름

메서드 이름은 동사나 동사구가 적합

postPayment, deletePage, save 등으로 접근자, 변경자, 조건자의 메소드는 javabean에 따라 앞에 get, set, is를 붙인다


### 기발한 이름을 피하라

kill 이런거 말고 abort로 명료하게 써라

### 한 개념에 한 단어를 사용하라

fetch, retrieve, get은 같은 개념이니 하나만 선택해서 사용
비슷한 개념은 한 단어로 일관성 있게 사용

### 말장난을 하지마라

비슷한 개념이라도 다른 역할이면 다른 단어 사용
insert, add는 비슷해보이지만 다른 단어 -> 굳이 일관성을 지키기 위해 사용 안해도 된다

### 해법 영역에서 가져온 이름을 사용하라 & 문제 영역에서 가져온 이름을 사용

읽는 사람을 고려하여 이름을 작성하자 - 기술 영역은 기술 도메인
기술 도메인에 없으면 해당 전문 영역에 대한 언어

### 의미있는 맥락 추가

firstName, lastName, street, houseNumber, city, state, zipcode 같이 주소라는 도메인을 유추할 수 있는 변수 사용이 중요

number, verb 등은 이해하기가 어려움

### 불필요한 맥락을 없애라

의미가 분명하다면 굳이 여러 접두사나 접미사를 붙일 필요는 없다