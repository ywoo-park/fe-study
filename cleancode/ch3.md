# Chapter3 함수

### 작게 만들어라

함수는 작게 만들어서 2,3,4줄 정도로 짧게 하는게 좋다

##### 블록과 들여쓰기

중첩 구조가 생길만큼 함수가 커져서는 안된다

### 한가지만 해라

한가지의 기준이라는 것은 추상화의 수준이 더 이상 줄일 수 있을 때까지 하는 것

### Switch 문

Switch 문으로 개발을 진행하면 하면 문제가 발생할 수 있다.
1. 함수가 길다
2. 한가지 작업만 수행하지 않음
3. Single Responsibility Principle을 위반한다
4. OCP를 위반한다

다형성 객체 안에 코드를 숨겨서 다른 코드에 노출 하지 않는 경우를 제외하고 파생 클래스를 사용하지 않는다

### 서술적인 이름을 사용하라

서술적 이름 >>> 짧은 길이 
ex) includeSetupAndTeardownPages

### 함수 인수

함수 인수가 늘어날 수록 안좋은 함수이다
함수 인수가 늘어나면 테스트로 검증하기 어렵기 때문이다

##### 많이 쓰는 단항 형식

함수에 인수 1개를 넘기는 이유

1. 인수에 질문을 넘기는 경우 
    boolean fileExisted("MyFile")

2. 인수를 변환해 결과를 내는 경우
    InputStream fileOpen("MyFile")

대표적으로 이벤트에서 단항 형식을 사용

##### 플래그 인수

함수가 여러가지를 처리하는 뜻이므로 자제할 것

##### 이항 함수 & 삼항 함수

좌표 값처럼 두 개의 변수가 하나의 변수처럼 작용하는게 아니라면 필수적인 요소가 아니라면 자제하는 것이 좋음

##### 인수 객체 

String.format 같은 함수는 인수 개수가 가변적일 수도 있음

### 부수효과를 일으키지 마라

함수에서 한가지를 하겠다고 선언하고 인수나 시스템 전역 변수를 수정하는 경우는 coupling이나 order dependency를 초래

##### 출력 인수

출력 인수를 사용하는 방식을 피하자 -> this를 활용하라

### 명령과 조회를 분리하자

객체 상태를 변경하거나 객체 정보를 반환하거나 두가지 중 하나만 하도록 함수를 만들자

```
if(set("username", "unclebob")) -> 이런짓 하지말자
```

### 오류 코드보다 예외를 사용하자

```
if(deletePage(page) == E_OK)
```
보다는

```
try {
    XXX
} catch (Exception e) {
    logger.log(e.getMessage())'
}
```

처럼 뽑아내면 오류 처리 코드가 분리 되어 깔끔해진다

##### Try/Catch 코드 뽑아내기

코드 구조에 혼란을 일으키고 정상동작과 오류를 섞기에 따로 뽑아내서 별도 함수로 뽑아내는 것이 좋음

```
ex) public void delete(Page page) {
    try {
        deletePageAndAllReferences(page);
    }
    catch (Exception e) {
        logError(e);
    }
}

private void  logError(Exception e) {
    logger.log(e.getMessage());
}

```

##### 오류 처리도 한가지 작업

오류 처리 함수는 '오류만' 처리해야함

##### Error.java 의존성 자석

```
public enum Error{
    OK,
    INVAILD,
    NO_SUCH
}
```

위 코드를 사용하면 변했을 때 다시 컴파일 하고 배치해야하기 때문에 재컴파일이 귀찮아짐
그러므로 예외를 사용한다면 Exception클래스를 통해서 추가할 수 있음(재컴파일 X)

### 반복 하지마라

코드를 부모 클래스로 몰아서 중복을 제거함

### 구조적 프로그래밍

모든 함수와 함수내 입구와 출구를 하나만 존재해야하고

루프 안에서 break나 continue를 사용하지 말고 goto는 절대 금지

함수를 작게 만들경우는 continue, break도 괜찮다

### 결론

함수는 동사이고 클래스는 명사이다
길이가 짧고, 이름이 좋고 체계가 잡힌 함수가 좋다
