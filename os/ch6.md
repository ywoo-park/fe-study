# Ch6 Synchronization Tools

## Cooperating Process 공유자원

6.1 Background
- 공유 접근이 가능한 공유 데이터에 대해서는 데이터의 무결성을 보장 불가
- 같이 실행되는 자원들이 데이터에 접근할 때 순서대로 실행되도록 보장 필요
    - 데이터가 공유 할 경우?
        - 도입 스트림 상 어디서 interrupt가 발생할지 모름
    - 병렬 프로그래밍을 쓸 경우
        - 동기화 문제 발생 가능성

6.2 Producer-Consumer

- Buffer을 통해 Pub와 Con이 수행
	- Code
	```
    Producer에서 데이터를 넣고 Consumer가 가져가는 코드
	Data inconsistency : 데이터 불일치 발생
	실제로 동작할 때는 4,5,6이 나옴
	쓰레드를 2개 실행 시키고 두 쓰레드를 기다리는 코드
	기계어 레벨에서 register로 데이터를 가져와서 데이터를 계산하고 다시 변수에 돌려보냄
	같은 레지스터지만 interrupt 되는 과정에서 임의적인 순서로 되어 있기 때문에 데이터 정합성이 깨짐
    ```

6.3 Race-Condition
- 여러 개의 프로세스나 쓰레드 존재
- 데이터를 공유할 경우 상태에 따라 결과값이 달라짐
- 해결 방법
	- 한 프로세스에서만 데이터를 다루는 작업 = synchronized

6.4 Critical Section Problem
- N개의 프로세스가 존재할 때, 특정 섹션 코드를 공유하는 영역
- 그런 데이터를 공유하는 작업 할 때, 동시에 접근 못하게 하는 것을 통해 Race Condition 해결 가능
- Entry-section
	- 크리티컬 섹션 진입하는 코드
- Exit-section
	- 크리티컬 섹션에서 나오는 코드
- Remainder-section
	- 나머지 코드

6.5 Mutual Exclusion 상호 배제
- critical section에서 어떤 것을 실행중이면 다른 섹션은 진입할 수 없음
    - Progress : (avoid deadlock)
	    - 어떤 프로세스가 크리티컬 섹션에 아무도 진입 하지 못하는 상황
    - Bounded Waitng (avoid starvation)
    	- 우선순위에 밀려서 해당 섹션에 진입하지 못하는 상황

- Single-core 환경에서는?
	- interrupt가 발생하지 않도록 함 (특정 시간 내에서 들어오지 못하도록 한다)
	- 멀티 프로세서 환경에서는 해당 작업을 진행 하면 성능이 급격한 저하
		- 특히 critical section이 긴 경우
	- preemptive kernel과 non-preemptive kernel이 존재

- Non-preemptive kernel
	- 커널모드를 나갈 때까지 CPU를 독점
	- race condition / kernel data 문제에서 해방

- Preemptive kernel
	- 이 친구는 race condition 발생 가능


------

6.6 Peterson’s Solution
- Dekkers’s Algorithm
- Eisenberg & McGruire’s Algorithm
	- n개의 프로세스에 대해서 n-1의 대기를 발생 시키는 알고리즘 (베이커리 알고리즘)
- Perterson’s algorithm
	- guarantees가 없다 -> load & store로 해결가능
	- 궁극적으로 해결한 알고리즘
	- turn이라는 변수와 flag라는 boolean 체킹 함수로 가능
	- Code
	```
    flag라는 boolean값이 true(내차례 확인) 및 turn (내 턴)이 오면 critical section 진입
	critical section이 끝나면 flag값을 다시 false로 바꿔서 문제 해결
	- 순서
		1. Producer에서는 자신의 flag값을 true로 바꾸고 턴을 상대에게 넘겨줬을 때 상대가 critical section이 종료할 때까지 대기
		2. Consumer에서 flag값을 넘겨주거나 턴을 넘겨준다면 실행
	```
	- 제대로 동작할 것이라는 보장이 없다
		- flag / turn 변수 자체에 대한 이슈
		- 하드웨어적이 아닌 코드적 해결
	- 그러나 개념적으로는 Race-condition을 해결한 이슈

6.7 Hardware-based Solution
1. 메모리 베리어
2. 하드웨어 지침
- Atomicity
	- 어떤 값을 확인해서 수정하는 것을 cpu one clock에 해결할 수 있도록 하면 된다		
    - test_and_set()
	````
    중간에 interrupt가 되지 않도록 진행
	critical section 내에서는 lock을 걸고 끝나면 lock을 해제
	적어도 mutual exclusion은 해결 가능
	```
- Atomic Variable
	- single variable
	- AtomicBoolean 변수를 이용해서 하드웨어 쪽 코드를 변경