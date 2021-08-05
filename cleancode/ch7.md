# 7장 오류 처리

- 오류 처리는 필수적인 요소
    - 입력 이상 또는 디바이스가 실패할 경우 대비
- 실제 코드가 하는 일을  파악하기가 거의 불가능

### 오류 코드보다 예외를 사용

- if를 통한 오류 처리보다는 예외를 던지는 코드를 사용하면 호출자 코드가 깔끔해짐
- 논리 코드와 오류 처리 코드가 뒤섞이지 않도록 한다

### Try-Catch-Finally 문부터 작성하자

- try는 트랜잭션과 비슷하기 때문에 catch는 프로그램 상태를 일관성있게 유지해야한다
- 예외를 프로그램 안에서 범위를 정의할 수 있다

### 미확인 예외를 사용하자

- 메서드가 반환할 예외를 전부 확인해야함
- 그러나 OCP를 위반한다 -> 하위 단계에서 코드를 변경하면 상위 단계 메소드를 전부 고쳐야함

### 예외에 의미를 제공하라

- 예외를 던질 때 전후 상황을 덧붙여 원인과 위치를 찾기 쉽게 하자
- 오류 메시지에 정보를 담아서 실패한 연산 이름과 유형도 언급하자

### 호출자를 고려해서 예외 클래스를 정의하라

- 오류를 분류하는 기준을 잡아내는 방법이 제일 좋다
    - 오류를 기록하고 -> 계속 수행해도 좋은지 확인한다
- 중복을 줄이기 위해서 Wrapper 클래스를 활용해서 의존성을 줄이는 것이 좋다


### 정상 흐름을 정의하라

- 특수 사례 패턴 -> 클래스를 만들거나 객체를 조작해서 특수 사례를 처리를 하면 클라이언트 코드가 예외 상황을 처리할 필요가 없다

### null을 반환하지 마라

- null은 일거리를 늘리고 호출자에게 문제를 떠넘긴다
- NullPointerException이 너무 많이 발생하기 때문에 프로그램이 어지러워진다

### null을 전달하지 마라

- 위와 마찬가지 이유로 InvaildArgumentExcetion 예외처리가 가능하지만 대다수의 언어는 null 처리가 어렵다
- 따라서 null이 넘어오는 것은 코드에 문제가 있다는 것

### 결론

깨끗한 코드는 읽기도 좋고 안정성도 좋아하기 떄문에 오류와 논리를 분리하는 것은 좋다!