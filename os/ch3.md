# ch3 Process

##### 프로세스 간 통신

- Shared Memory : POSIX
    - Unix에서 OS 표준화 메모리 기법
- Message Passing : Pipes
    - 전통적인 Unix 시스템 기법


- POSIX shared memory
    - 메모리에 파일을 매핑해서 사용
        1. 메모리에 공유메모리 생성
        2. 사이즈를 정의
        3. 메모리를 공유메모리에 매핑

