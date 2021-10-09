# Docker

## Docker

### Docker

- 클라우드 환경에서 가상 환경을 만들어내기 쉬워짐
- 생성된 가상 서버에 각종 소프트웨어 설치
    - 서버의 개수가 많아진다면?
        - 설치의 배포가 어려움
        - AS-IS) Shell Script로 설치 및 설정 자동화 구현 - 복잡한 기능 및 중앙 관리 시스템의 부재
- Immutable Infrastructure
    - 호스트 OS와 서비스 운영환경을 분리
    - 한번 설정한 운영 환경 불변
    - 위를 이미지로 생성하여 서버에 배포
    - 장점
        - 편리한 관리
            - 이미지 자체만 관리하면 된다
            - 버전 관리로 사용 가능
        - 확장
            - 이미지 하나로 서버 찍어내기를 통해서 쉬운 확장 가능
        - 테스트
            - 테스트가 쉬움
        - 가벼움
            - 어디서든 실행 가능

- 가상 머신
    - 반가상화
        - 하이퍼바이저 - 게스트 OS - 실행파일/라이브러리 - 어플리케이션
    - Docker
        - Docker 엔징 - 실행파일/라이브러리 - 어플리케이션
    - 하드웨어 가상화 계층이 없어 메모리 접근, 파일시스템, 네트워크 속도가 가상 머신보다 월등히 빠름

- Images & Container
    - Docker Image 
        - read only의 docker container을 생상하기 위한 template 
