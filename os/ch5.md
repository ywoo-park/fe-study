# Ch5 CPU Scheduling

### 스케쥴링 알고리즘

- SJF - 최적화 알고리즘
	- 짧은 작업 시간의 대기 시간이 줄어듬
	- 평균 대기 시작은 감소함

- SJF는 구현이 불가능
    - next CPU burst를 알수 있는 방법이 없음
    - 따라서 해당 내용을 근사적으로 예측

- next CPU burst 예측 시간 계산
	- 최근에 사용한 일정을 계산
	- 점화식으로 확인 가능
	- 알파의 수치가 크면 클수록 과거에 가중치가 강함 (따라서 SJF는 이론적으로만 완벽)

- SJF 알고리즘
	- 선점 or 비선점 : 무엇인지 모름	
	- 비선점 : 기다렸다가 진입
	- 선점 : 기존에 작업하던 작업을 치워 버리고 작업

- SRTF - 선점형 SJF
    - 새로 도착한 작업이 이전 시간의 작업보다 짧을 경우 바로 치워버리고 자신이 선점
    - 예시에 따라 실습해보면 선점형이 훨씬 짧게 나옴

- RR - Round-Robin
	- Time sharing을 하는 방식
	- preemptive FCFS + 시간 제한
	- 보통은 10milliseconds로 준다
	- 만약에 작업에 CPU burst time이 timer 보다 클 경우 OS에 interrupt를 걸고 context switching이 발생하여 ready상태로 바뀐다
	- RR은 조금 더 길어질 수도 있음
	- 선점형 알고리즘
	- time quantum을 얼마나 주느냐에 따라서 사이즈가 극과극으로 달라짐 + context switching 시간 생각

- Priority-base
	- priority를 어떻게 줄 것인가?
	- 우선순위를 주어 계산하는 알고리즘
	- SJF가 여기에 해당하는 알고리즘
	- 선점과 비선점 알고리즘이 가능
	- Starvation 문제
		- 낮은 우선순위 친구는 무한 대기 할 수 있는 가능성이 존재
		- Aging : 오래 기다리면 가중치를 주는 방식
	- RR과 Priority를 섞어서 쓰는 방법도 존재	
		- 같은 우선순위에 한해 RR을 사용

- Multi Level Queue(MLQ) Scheduling
	- 분리된 프로세스에 따라 다른 가중치를 두어 작업
	- 일반적으로 real-time > system > interactive > batch
	- ex) 퀀텀 8 -> 퀀텀 16 -> FCFS
	- 실제로 많이 사용하는 알고리즘 + MultiCore까지

- 현대적 OS
	- 커널 쓰레드만 스케쥴링 하면 된다 
	- process는 굳이 해줄 필요 없음
	- 위 내용을 kernel 쓰레드에만 적용하면 된다

- Real-TIme CPU Scheduling
	- Soft Realtime : Hard Realtime
	- Soft Realtime : 실시간으로 처리하는 것이 일부 문제가 생기는 것보다 중요할 경우 (우선순위 중요)
	- Hard Realtime : Deadline안에 처리가 더 중요함 (우선순위 크게 X)

--------

[장고(Django)]
- Django Application
- WSGI를 이용한 Multithread (+ WSGI와 PM2)
- Nginx+uWSGI로 concurrency 높이기
- 멀티스레딩과 GIL

GIL : Global Interpreter Lock
	- 하나의 쓰레드를 시분할 하는 효과
	- 하지만 파이썬에서는 멀티 쓰레딩을 막아놨음
	- 사실상 Context Switching 시간까지 더했을 때 시간이 더 걸리긴 함
	- 이를 위해서는 kenel thread단에서 작업하거나 I/O 비동기를 활용해야함
	- Python에서 병렬성을 얻는 방법 = 멀티프로세싱, GPU, 분산 처리 활용

GIL 실행 코드

```
from threading import Thread
import time

def threadWork(start, end, result):
    sum = 0

    for i in range(start,end):
        sum += i
    result.append(sum)
    return

if __name__=='__main__':

    start = time.time()

    hold = 20000000
    index = [1,2,3] # [1,2,3]

    threads = list()
    result = list()

    for i in index:
        th = Thread(target=threadWork, args=( (i-1) * (hold + 1) , hold*i, result))

        threads.append(th)
        th.start()

    for i in index:
        threads[i-1].join()

    end = time.time()
    
    print ( 'Result : ' + str(sum(result)) + ' time :' + str(end-start) )

```















