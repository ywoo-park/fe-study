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

6.3.1 Critical Section Problem
- N개의 프로세스가 존재할 때, 특정 섹션 코드를 공유하는 영역
- 그런 데이터를 공유하는 작업 할 때, 동시에 접근 못하게 하는 것을 통해 Race Condition 해결 가능
- Entry-section
	- 크리티컬 섹션 진입하는 코드
- Exit-section
	- 크리티컬 섹션에서 나오는 코드
- Remainder-section
	- 나머지 코드

6.3.2 Mutual Exclusion 상호 배제
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

6.3.3 Peterson’s Solution
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

6.4 Hardware-based Solution
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


---------------------

6.5 Mutex Locks

- 높은 수준에서의 Critical Section Problem을 해결하기 위한 도구
	- Mutex Locks : 동기를 위한 가장 간단한 도구
	- Semaphore : n개를 제어할 때 효과 적인 도구
	- Monitor : 뮤텍스와 세마포를 해결한 도구
	- Livness : 데드락 문제도 해결해주는 도구

- Mutex Lock
	- 상호 배제 구현 도구
	- critical seciton을 보호하여 race condition 방지
	- critical section을 들어가고 나갈 때 lock을 대여하고 반납함
	- 두개의 opertion이 존재
		- acquire() / release()
			- 위 함수를 통해 구현 
		- available
			- lock이 있는지 없는 지 확인하는 변수
		- acquire / release 함수는 atomic하게 구현
		- 복잡한 상황에서는 compare and swap 함수로 구현

- Busy waiting
	- 어떤 프로세스가 critical section에 들어가기 위해서는 무한 루프를 돌아야함
	- CPU 사이클이 과도하게 낭비되는 현상 (공회전)

- Spinlock
	- mutexlock을 busy wating하면서 기다리는 lock
	- spinlock이 유용할 때가 있는데, CPU 코어가 많은 경우
	- context switch가 일어나지 않음
		- ready queue를 타지 않지 않고 상시 대기

```
Deadlock 및 starvation 문제는 존재
```

6.6 Semaphore

- semaphore : 신호기

- wait() & signal()
	- P()와 V() 상태가 존재
	- wait() => S가 0보다 작으면 busy wait 이후에 S를 줄임
	- signal() => S를 증가 시킴 

- Binary & Counting Semaphore
	- Binary Semaphore
		- 0하고 1만 쓰는 세마포어 = mutex lock과 비슷
	- Counting Semaphore
		- 무제한

- Counting Semaphore 이용
	- 리소스를 사용할 때마다 wait()
	- release할 때는 signal() 사용
	- 0이면 모든 리소스 사용 중

- Semaphore Implementation
	- 세마포어는 busy waiting 문제가 존재
	- P(), V()을 수정하여 극복 해야함
	- wait()은 waiting queue에 넣고
	- signal()은 ready queue에 넣음

6.7 Monitors

- 세마포의 단점
	- 세마포는 타이밍 에러가 자주 발생

- 세마포의 문제 예제
	- wait하고 signal을 순서대로 하지 않는 경우 -> critical section에 동시에 진입
		- 코드가 복잡히지다 보면 가끔 발생
	- wait() 이후에 또 wait()이 나옴
	- 일반적으로 프로그래머가 악의를 품거나 잘 몰라서 그런 경우

- Monitor
	- 조금 더 higher-level에서 제어하는 방법 
	- mutual exclusion을 제공해주는 class를 확인
	- 구성
		- 초기화 코드
		- 공유 operation들 
		- shared data에서 이어진 entry queue

- Conditional Variables
	- condition이라는 변수를 두고 각각의 변수에 대해서 초기화 및 정리
	
- Java Monitors
	- 자바에서는 monitor-like를 제공 
	- Synchronize 키워드
	- wait() & notify() 메소드 사용
	
- Synchronized
	- 임계 영역에 해당하는 코드 블록을 선언할 때 사용하는 자바 키워드
	- 모니터락 획득해야 접근 가능
	- 해당 객체 지정 가능
	- 메소드에 선언시 전체가 임계 영역 - this가 해당 객체

- wait() / notify()
	- wait()을 호출하면 대기 상태
	- notify()를 호출하면 쓰레드 하나를 깨움
	- notifyAll() 쓰레드 전부를 깨움

- Livness
	- Monitor -> 개념적으로 이해를 하는 것이 좋음
	- dead lock문제나 starvation을 해결해줄 수 있는 알고리즘

- Deadlock
	- 서로 wait만 하는 현상 때문에 더 나아가지 못하는 상태

- Priority Inversion
	- 우선순위가 밀리는 현상
	- lower-priority가 더 많음에도 불구하고 점유하여 못 들어오는 현상
	- priority-inheritance 프로토콜로 해결
	