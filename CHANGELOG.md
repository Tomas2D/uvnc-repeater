# Changelog

<a name="1.5.4"></a>
## 1.5.4 (2026-07-24)

### Changed

- ⚡ perf(gateway): enable TCP_NODELAY on relay sockets (disable Nagle) [[df6fefd](https://github.com/Tomas2D/ultravnc-repeater/commit/df6fefd2f9922f9ced05318e8ff63df538456be8)]
- ⚡ perf(gateway): make handshake header read event-driven instead of 100ms polling [[97865d0](https://github.com/Tomas2D/ultravnc-repeater/commit/97865d07eec53fa9e66e7321862eef3076f1e6eb)]

### Miscellaneous

-  1.5.4 [[3dbb96f](https://github.com/Tomas2D/ultravnc-repeater/commit/3dbb96f80557d11a195ca3c5beda95961baad41f)]
-  fix(deps): update dependencies, fix npm audit, and remove Node 16 from CI [[e6ba5da](https://github.com/Tomas2D/ultravnc-repeater/commit/e6ba5da1fa9c9a74b8b4362c2da0b4fd1142b67c)]
-  Merge pull request [#479](https://github.com/Tomas2D/ultravnc-repeater/issues/479) from Tomas2D/perf/event-driven-header-read [[a6f50f2](https://github.com/Tomas2D/ultravnc-repeater/commit/a6f50f2b462b6f53799f6a26126eca0e1019360e)]
-  Merge pull request [#480](https://github.com/Tomas2D/ultravnc-repeater/issues/480) from Tomas2D/perf/tcp-nodelay-relay-sockets [[9ae3ab8](https://github.com/Tomas2D/ultravnc-repeater/commit/9ae3ab8e7474d91f8b5d55986cf16e199d1ad84f)]
-  Merge pull request [#415](https://github.com/Tomas2D/ultravnc-repeater/issues/415) from Tomas2D/dependabot/npm_and_yarn/tsup-8.5.0 [[ad5dea1](https://github.com/Tomas2D/ultravnc-repeater/commit/ad5dea105b1a7783c96450caae91e3b374ce84a7)]
-  Bump tsup from 8.1.0 to 8.5.0 [[6c737f7](https://github.com/Tomas2D/ultravnc-repeater/commit/6c737f7ccf669938fc5f407e546784be4c52c2a1)]
-  Merge pull request [#385](https://github.com/Tomas2D/ultravnc-repeater/issues/385) from Tomas2D/dependabot/npm_and_yarn/typescript-5.8.2 [[38f00c5](https://github.com/Tomas2D/ultravnc-repeater/commit/38f00c56599dafaa7c66fec3a78b18af001ce08c)]
-  Bump typescript from 5.7.2 to 5.8.2 [[5865b65](https://github.com/Tomas2D/ultravnc-repeater/commit/5865b655392aedc29dc913a9b5299d9ca6a87523)]
-  Merge pull request [#366](https://github.com/Tomas2D/ultravnc-repeater/issues/366) from Tomas2D/dependabot/npm_and_yarn/net-keepalive-4.0.13 [[db0e76d](https://github.com/Tomas2D/ultravnc-repeater/commit/db0e76d051f49cf5801f324dc65dff53a71c7780)]
-  Bump net-keepalive from 4.0.11 to 4.0.13 [[cca7472](https://github.com/Tomas2D/ultravnc-repeater/commit/cca7472b7e8b9260ac2a1f1a86a190f2864e1d46)]
-  Merge pull request [#362](https://github.com/Tomas2D/ultravnc-repeater/issues/362) from Tomas2D/dependabot/npm_and_yarn/types/node-22.10.5 [[dc8b0b4](https://github.com/Tomas2D/ultravnc-repeater/commit/dc8b0b46b32c10ba320f8b375f563bf4335f27e2)]
-  Bump @types/node from 22.10.2 to 22.10.5 [[12acd25](https://github.com/Tomas2D/ultravnc-repeater/commit/12acd25fea9fca0ed9e78cb8a7ffa3d13baf206e)]
-  Merge pull request [#361](https://github.com/Tomas2D/ultravnc-repeater/issues/361) from Tomas2D/dependabot/npm_and_yarn/pino-9.6.0 [[5fcb69d](https://github.com/Tomas2D/ultravnc-repeater/commit/5fcb69da0fa9345bde6bf9296a549a6d87e40fde)]
-  Bump pino from 9.5.0 to 9.6.0 [[44a81e9](https://github.com/Tomas2D/ultravnc-repeater/commit/44a81e9a16571a3cdcf18d4958e687d9f4054c41)]
-  Merge pull request [#358](https://github.com/Tomas2D/ultravnc-repeater/issues/358) from Tomas2D/dependabot/npm_and_yarn/lint-staged-15.3.0 [[87ed071](https://github.com/Tomas2D/ultravnc-repeater/commit/87ed071e67f1e59c27d779b412d7c60b59db1b6b)]
-  Bump lint-staged from 15.2.10 to 15.3.0 [[16d312b](https://github.com/Tomas2D/ultravnc-repeater/commit/16d312b4eca2ae399b3eb63e61469cd7646836e9)]
-  Merge pull request [#355](https://github.com/Tomas2D/ultravnc-repeater/issues/355) from Tomas2D/dependabot/npm_and_yarn/types/node-22.10.2 [[26e774f](https://github.com/Tomas2D/ultravnc-repeater/commit/26e774fbd7f15aa715e37d547006aeae48c32281)]
-  Bump @types/node from 22.10.1 to 22.10.2 [[78beb15](https://github.com/Tomas2D/ultravnc-repeater/commit/78beb15b6df68e5218d1fb4c97ae4dffb0585dee)]
-  Merge pull request [#354](https://github.com/Tomas2D/ultravnc-repeater/issues/354) from Tomas2D/dependabot/npm_and_yarn/net-keepalive-4.0.11 [[a0233a9](https://github.com/Tomas2D/ultravnc-repeater/commit/a0233a9502f2c015db72223848c9f56f54f3f827)]
-  Bump net-keepalive from 4.0.10 to 4.0.11 [[3136793](https://github.com/Tomas2D/ultravnc-repeater/commit/3136793f2c847e8cfa12d41e4c7a65d59cc03d5a)]
-  Merge pull request [#349](https://github.com/Tomas2D/ultravnc-repeater/issues/349) from Tomas2D/dependabot/npm_and_yarn/prettier-3.4.2 [[6587b8e](https://github.com/Tomas2D/ultravnc-repeater/commit/6587b8eca357e981ba324b2791d18fc97fe04d8d)]
-  Bump prettier from 3.4.1 to 3.4.2 [[c4ee6bf](https://github.com/Tomas2D/ultravnc-repeater/commit/c4ee6bf0815c5b16e88f2b03b650fb85de12edf5)]
-  Merge pull request [#348](https://github.com/Tomas2D/ultravnc-repeater/issues/348) from Tomas2D/dependabot/npm_and_yarn/types/node-22.10.1 [[c6d0536](https://github.com/Tomas2D/ultravnc-repeater/commit/c6d0536452875382b3ffd9047c7ab046feacc136)]
-  Bump @types/node from 22.9.0 to 22.10.1 [[b67ad74](https://github.com/Tomas2D/ultravnc-repeater/commit/b67ad745464c4faf0d0eacecbae3de81a695512e)]
-  Merge pull request [#345](https://github.com/Tomas2D/ultravnc-repeater/issues/345) from Tomas2D/dependabot/npm_and_yarn/prettier-3.4.1 [[a756908](https://github.com/Tomas2D/ultravnc-repeater/commit/a756908e33efb0f3b7eff04276e49618d4ce62f5)]
-  Bump prettier from 3.3.3 to 3.4.1 [[79b51f3](https://github.com/Tomas2D/ultravnc-repeater/commit/79b51f3cbdb741f2d91056fe713fadaaab3988bd)]
-  Merge pull request [#342](https://github.com/Tomas2D/ultravnc-repeater/issues/342) from Tomas2D/dependabot/npm_and_yarn/typescript-5.7.2 [[a6a3a21](https://github.com/Tomas2D/ultravnc-repeater/commit/a6a3a2151af1a044dbc34fafa61a0a1cd70558d8)]
-  Bump typescript from 5.6.3 to 5.7.2 [[ed3081e](https://github.com/Tomas2D/ultravnc-repeater/commit/ed3081e35bea14d98a534a5d1e29e79feda81e96)]
-  Merge pull request [#341](https://github.com/Tomas2D/ultravnc-repeater/issues/341) from Tomas2D/dependabot/npm_and_yarn/husky-9.1.7 [[58631e1](https://github.com/Tomas2D/ultravnc-repeater/commit/58631e1a1ceb6c216248904446eade275089ec06)]
-  Bump husky from 9.1.6 to 9.1.7 [[964dcd9](https://github.com/Tomas2D/ultravnc-repeater/commit/964dcd9d5674bd23c9f87ab9f692ee4f8f9788af)]
-  Merge pull request [#338](https://github.com/Tomas2D/ultravnc-repeater/issues/338) from Tomas2D/dependabot/npm_and_yarn/pino-pretty-13.0.0 [[ed887bd](https://github.com/Tomas2D/ultravnc-repeater/commit/ed887bd5760a6f210959813237c28c768fb83d21)]
-  Bump pino-pretty from 11.2.2 to 13.0.0 [[e6688b6](https://github.com/Tomas2D/ultravnc-repeater/commit/e6688b6f10744b1880ef813601184bd005a8419c)]
-  Merge pull request [#335](https://github.com/Tomas2D/ultravnc-repeater/issues/335) from Tomas2D/dependabot/npm_and_yarn/types/node-22.9.0 [[787766a](https://github.com/Tomas2D/ultravnc-repeater/commit/787766ac7b662904f55837f55ba91a667cd54e73)]
-  Bump @types/node from 22.8.6 to 22.9.0 [[293bd92](https://github.com/Tomas2D/ultravnc-repeater/commit/293bd928b4de338e683f248aaee539ac1c705ce2)]
-  Merge pull request [#332](https://github.com/Tomas2D/ultravnc-repeater/issues/332) from Tomas2D/dependabot/npm_and_yarn/types/jest-29.5.14 [[39662f2](https://github.com/Tomas2D/ultravnc-repeater/commit/39662f26b15edddc2450f30ba75d7c8c6a509e02)]
-  Bump @types/jest from 29.5.13 to 29.5.14 [[932dd61](https://github.com/Tomas2D/ultravnc-repeater/commit/932dd61f6f3c8a7847b215e4408c08f01a9c4894)]
-  Merge pull request [#331](https://github.com/Tomas2D/ultravnc-repeater/issues/331) from Tomas2D/dependabot/npm_and_yarn/types/node-22.8.6 [[724afb1](https://github.com/Tomas2D/ultravnc-repeater/commit/724afb17886a7f966e3ae89dabca54202c03f45a)]
-  Bump @types/node from 22.8.4 to 22.8.6 [[36b0085](https://github.com/Tomas2D/ultravnc-repeater/commit/36b00851f8bffa408909624b8d26b1263e79ecdb)]
-  Merge pull request [#328](https://github.com/Tomas2D/ultravnc-repeater/issues/328) from Tomas2D/dependabot/npm_and_yarn/types/node-22.8.4 [[5b56233](https://github.com/Tomas2D/ultravnc-repeater/commit/5b56233efd2d60e6b6a34d8d4cd2aa1ec28a3d87)]
-  Bump @types/node from 22.7.7 to 22.8.4 [[585a69e](https://github.com/Tomas2D/ultravnc-repeater/commit/585a69e9822cf3d1a187facb41d6f4f73dd9a626)]
-  Merge pull request [#323](https://github.com/Tomas2D/ultravnc-repeater/issues/323) from Tomas2D/dependabot/npm_and_yarn/pino-9.5.0 [[d5862ac](https://github.com/Tomas2D/ultravnc-repeater/commit/d5862acdef1640d91c0c1dcb7629575fead12028)]
-  Bump pino from 9.4.0 to 9.5.0 [[f850dd6](https://github.com/Tomas2D/ultravnc-repeater/commit/f850dd6f06cc5cdfbe2063f65c4690353786188e)]
-  Merge pull request [#320](https://github.com/Tomas2D/ultravnc-repeater/issues/320) from Tomas2D/dependabot/npm_and_yarn/types/node-22.7.7 [[6ead974](https://github.com/Tomas2D/ultravnc-repeater/commit/6ead974c63684e04b0a3d66eb8847e248eea9585)]
-  Bump @types/node from 22.7.5 to 22.7.7 [[34416da](https://github.com/Tomas2D/ultravnc-repeater/commit/34416da70c8a6ab39a40a05ea3114c98e6fcc5e2)]
-  Merge pull request [#314](https://github.com/Tomas2D/ultravnc-repeater/issues/314) from Tomas2D/dependabot/npm_and_yarn/types/node-22.7.5 [[7c123f8](https://github.com/Tomas2D/ultravnc-repeater/commit/7c123f8ee03c5bda4d26c26f124326d004d62663)]
-  Bump @types/node from 22.7.4 to 22.7.5 [[a3db90c](https://github.com/Tomas2D/ultravnc-repeater/commit/a3db90cd913d16f1a839aa3065c83acc12983b76)]
-  Merge pull request [#313](https://github.com/Tomas2D/ultravnc-repeater/issues/313) from Tomas2D/dependabot/npm_and_yarn/typescript-5.6.3 [[645b94e](https://github.com/Tomas2D/ultravnc-repeater/commit/645b94e5a153f1cc99ed3082dd701d701645e37b)]
-  Bump typescript from 5.6.2 to 5.6.3 [[89594ff](https://github.com/Tomas2D/ultravnc-repeater/commit/89594ff0778da2da1cfa69d8519cb57e9c3d3b18)]
-  Merge pull request [#310](https://github.com/Tomas2D/ultravnc-repeater/issues/310) from Tomas2D/dependabot/npm_and_yarn/net-keepalive-4.0.10 [[cb0dc01](https://github.com/Tomas2D/ultravnc-repeater/commit/cb0dc01fb9ee59a4b032b2aed68c49f33702c754)]
-  Bump net-keepalive from 4.0.9 to 4.0.10 [[db03ced](https://github.com/Tomas2D/ultravnc-repeater/commit/db03ced0619b89877ccb08e1c78485c36c9f8a9c)]
-  Merge pull request [#309](https://github.com/Tomas2D/ultravnc-repeater/issues/309) from Tomas2D/dependabot/npm_and_yarn/eslint-8.57.1 [[207b19b](https://github.com/Tomas2D/ultravnc-repeater/commit/207b19b8a1564ae03f2dc60319591351b0c8bb5c)]
-  Bump eslint from 8.57.0 to 8.57.1 [[f9ed80b](https://github.com/Tomas2D/ultravnc-repeater/commit/f9ed80b39ab4e2bd810962962e3f80b675b49848)]
-  Merge pull request [#308](https://github.com/Tomas2D/ultravnc-repeater/issues/308) from Tomas2D/dependabot/npm_and_yarn/types/node-22.7.4 [[7c38c11](https://github.com/Tomas2D/ultravnc-repeater/commit/7c38c1183462f1e1d88ec0be922bce142701851e)]
-  Bump @types/node from 22.5.4 to 22.7.4 [[abfdaf4](https://github.com/Tomas2D/ultravnc-repeater/commit/abfdaf4366b93eb21de70043a675dd8cadba2841)]
-  Merge pull request [#305](https://github.com/Tomas2D/ultravnc-repeater/issues/305) from Tomas2D/dependabot/npm_and_yarn/husky-9.1.6 [[3a76cf3](https://github.com/Tomas2D/ultravnc-repeater/commit/3a76cf3024bc61c0481063e8386bf0089c43ee04)]
-  Bump husky from 9.1.4 to 9.1.6 [[0d4ceba](https://github.com/Tomas2D/ultravnc-repeater/commit/0d4cebabbde5069be09fb412a5bf4476bef914b9)]
-  Merge pull request [#304](https://github.com/Tomas2D/ultravnc-repeater/issues/304) from Tomas2D/dependabot/npm_and_yarn/pino-9.4.0 [[c329640](https://github.com/Tomas2D/ultravnc-repeater/commit/c3296401a47b34697a7b2a5c191d9821f9a7e646)]
-  Bump pino from 9.3.2 to 9.4.0 [[e673894](https://github.com/Tomas2D/ultravnc-repeater/commit/e6738943dc7a73c181782fc8a065a6d713f7a5db)]
-  Merge pull request [#301](https://github.com/Tomas2D/ultravnc-repeater/issues/301) from Tomas2D/dependabot/npm_and_yarn/typescript-5.6.2 [[b92ccea](https://github.com/Tomas2D/ultravnc-repeater/commit/b92ccea2508e00558a4cdd8a1e5d0aec2b1f2f2f)]
-  Bump typescript from 5.5.4 to 5.6.2 [[2e7555b](https://github.com/Tomas2D/ultravnc-repeater/commit/2e7555bf6ac5f4fd0700b27f37312511ab02ef96)]
-  Merge pull request [#300](https://github.com/Tomas2D/ultravnc-repeater/issues/300) from Tomas2D/dependabot/npm_and_yarn/net-keepalive-4.0.9 [[5e30b34](https://github.com/Tomas2D/ultravnc-repeater/commit/5e30b34a8c58948dedeb9a9d203cbc2b8e0f1942)]
-  Bump net-keepalive from 4.0.6 to 4.0.9 [[b54563f](https://github.com/Tomas2D/ultravnc-repeater/commit/b54563f43a4cb0af9b73e2d872090bd97d550379)]
-  Merge pull request [#296](https://github.com/Tomas2D/ultravnc-repeater/issues/296) from Tomas2D/dependabot/npm_and_yarn/types/jest-29.5.13 [[b3d991a](https://github.com/Tomas2D/ultravnc-repeater/commit/b3d991adeb83cfbbda77520fb5c6263436f29fda)]
-  Bump @types/jest from 29.5.12 to 29.5.13 [[fae7bef](https://github.com/Tomas2D/ultravnc-repeater/commit/fae7befaf1251509419581a54810d589bb610ab0)]
-  Merge pull request [#295](https://github.com/Tomas2D/ultravnc-repeater/issues/295) from Tomas2D/dependabot/npm_and_yarn/lint-staged-15.2.10 [[6d1cae2](https://github.com/Tomas2D/ultravnc-repeater/commit/6d1cae24c107f8efbf6d9d92c8781e45a10b1e2b)]
-  Bump lint-staged from 15.2.7 to 15.2.10 [[00a4f7b](https://github.com/Tomas2D/ultravnc-repeater/commit/00a4f7b4898040ed3675fe0714a75f29d6b9dc77)]
-  Merge pull request [#291](https://github.com/Tomas2D/ultravnc-repeater/issues/291) from Tomas2D/dependabot/npm_and_yarn/types/node-22.5.4 [[68c5ca2](https://github.com/Tomas2D/ultravnc-repeater/commit/68c5ca29cc6855fe71aa36f3ce785f9204201ff6)]
-  Bump @types/node from 22.5.2 to 22.5.4 [[58d5ad7](https://github.com/Tomas2D/ultravnc-repeater/commit/58d5ad7ce01f35df965fa1f99fe07628a5d57378)]
-  Merge pull request [#290](https://github.com/Tomas2D/ultravnc-repeater/issues/290) from Tomas2D/dependabot/npm_and_yarn/ts-jest-29.2.5 [[e6fb07f](https://github.com/Tomas2D/ultravnc-repeater/commit/e6fb07f0c681c7c67a1b1b1dd7b28c96283ad5c2)]
-  Bump ts-jest from 29.2.3 to 29.2.5 [[efdc474](https://github.com/Tomas2D/ultravnc-repeater/commit/efdc4742292eadfb4bad16b6f53e3677ffad37f7)]
-  Merge pull request [#287](https://github.com/Tomas2D/ultravnc-repeater/issues/287) from Tomas2D/dependabot/npm_and_yarn/net-keepalive-4.0.6 [[6cbdcb3](https://github.com/Tomas2D/ultravnc-repeater/commit/6cbdcb3d161504cc4824d0356da97f42e76070ab)]
-  Bump net-keepalive from 4.0.5 to 4.0.6 [[1eaac70](https://github.com/Tomas2D/ultravnc-repeater/commit/1eaac70bac83da4b8f1353cfff093ebe4123629f)]
-  Merge pull request [#286](https://github.com/Tomas2D/ultravnc-repeater/issues/286) from Tomas2D/dependabot/npm_and_yarn/types/node-22.5.2 [[e0859c4](https://github.com/Tomas2D/ultravnc-repeater/commit/e0859c4a411a9865772a3d90153725d3b65bfc12)]
-  Bump @types/node from 22.4.0 to 22.5.2 [[9355cb2](https://github.com/Tomas2D/ultravnc-repeater/commit/9355cb2a65d1c8b2b41510de7c4dda50b07ca039)]
-  Merge pull request [#281](https://github.com/Tomas2D/ultravnc-repeater/issues/281) from Tomas2D/dependabot/npm_and_yarn/types/yargs-17.0.33 [[f324c9e](https://github.com/Tomas2D/ultravnc-repeater/commit/f324c9e62ce76e0c587353bc25313e6a722de4e0)]
-  Bump @types/yargs from 17.0.32 to 17.0.33 [[b689a8f](https://github.com/Tomas2D/ultravnc-repeater/commit/b689a8fd6f7ebf97dd2b0cf9e463e3435a47f7be)]
-  Merge pull request [#279](https://github.com/Tomas2D/ultravnc-repeater/issues/279) from Tomas2D/dependabot/npm_and_yarn/net-keepalive-4.0.5 [[5d3bb48](https://github.com/Tomas2D/ultravnc-repeater/commit/5d3bb48d23c32a64f119cb240eeeb33158f82fbe)]
-  Bump net-keepalive from 4.0.3 to 4.0.5 [[3c60eec](https://github.com/Tomas2D/ultravnc-repeater/commit/3c60eecec6f03d62ef092c37bbc7ece35b67e0af)]
-  Merge pull request [#277](https://github.com/Tomas2D/ultravnc-repeater/issues/277) from Tomas2D/dependabot/npm_and_yarn/types/node-22.4.0 [[d065bd5](https://github.com/Tomas2D/ultravnc-repeater/commit/d065bd5565c8d83025fa70d11da199dd7cc7e1b3)]
-  Bump @types/node from 22.0.2 to 22.4.0 [[b03772c](https://github.com/Tomas2D/ultravnc-repeater/commit/b03772c45235e524d9581a34040eb458d8e80a4c)]
-  Merge pull request [#268](https://github.com/Tomas2D/ultravnc-repeater/issues/268) from Tomas2D/dependabot/npm_and_yarn/pino-9.3.2 [[ea26c50](https://github.com/Tomas2D/ultravnc-repeater/commit/ea26c50c2e6b3d7585909591f15737cecf2f7a5c)]
-  Bump pino from 9.3.1 to 9.3.2 [[e1eedee](https://github.com/Tomas2D/ultravnc-repeater/commit/e1eedeeba401609c0228fd4a14caa80170fe12f6)]
-  Merge pull request [#264](https://github.com/Tomas2D/ultravnc-repeater/issues/264) from Tomas2D/dependabot/npm_and_yarn/types/node-22.0.2 [[b115a00](https://github.com/Tomas2D/ultravnc-repeater/commit/b115a0034d4139caef12caf5e9c308719c894bb6)]
-  Merge pull request [#267](https://github.com/Tomas2D/ultravnc-repeater/issues/267) from Tomas2D/dependabot/npm_and_yarn/net-keepalive-4.0.3 [[9b36527](https://github.com/Tomas2D/ultravnc-repeater/commit/9b3652781c010d11665c5207b3382b6b382d4e68)]
-  Bump net-keepalive from 4.0.1 to 4.0.3 [[1f3bb27](https://github.com/Tomas2D/ultravnc-repeater/commit/1f3bb27c572ffa9fdafb0561b1143a361bc3a4cd)]
-  Bump @types/node from 22.0.0 to 22.0.2 [[f3f0be6](https://github.com/Tomas2D/ultravnc-repeater/commit/f3f0be67aea540609484f25f5f8de5493738ecfb)]
-  Merge pull request [#258](https://github.com/Tomas2D/ultravnc-repeater/issues/258) from Tomas2D/dependabot/npm_and_yarn/types/node-22.0.0 [[7816d95](https://github.com/Tomas2D/ultravnc-repeater/commit/7816d959b8a49f1b2dd6f3dbb5cbcc36d2aa542e)]
-  Merge pull request [#260](https://github.com/Tomas2D/ultravnc-repeater/issues/260) from Tomas2D/dependabot/npm_and_yarn/pino-pretty-11.2.2 [[e092239](https://github.com/Tomas2D/ultravnc-repeater/commit/e09223917bc1f80fdd3ef8343a4af078bf0c33e4)]
-  Merge pull request [#261](https://github.com/Tomas2D/ultravnc-repeater/issues/261) from Tomas2D/dependabot/npm_and_yarn/husky-9.1.4 [[fbba990](https://github.com/Tomas2D/ultravnc-repeater/commit/fbba990955a94544e92be82e87149d04871e323d)]
-  Bump husky from 9.1.1 to 9.1.4 [[dc36f55](https://github.com/Tomas2D/ultravnc-repeater/commit/dc36f553b40dd7b0f98a8b88de4d9d7ee0d018c8)]
-  Bump pino-pretty from 11.2.1 to 11.2.2 [[82b5b49](https://github.com/Tomas2D/ultravnc-repeater/commit/82b5b4992d4f18eebf641dc6b38d6eb6a7c75f4d)]
-  Bump @types/node from 18.19.42 to 22.0.0 [[60d2ff9](https://github.com/Tomas2D/ultravnc-repeater/commit/60d2ff9a25dc99176e212c6bf0b8cd9defa3d909)]
-  Merge pull request [#249](https://github.com/Tomas2D/ultravnc-repeater/issues/249) from Tomas2D/dependabot/npm_and_yarn/ts-jest-29.2.3 [[4cea3eb](https://github.com/Tomas2D/ultravnc-repeater/commit/4cea3ebee78f7920d32b2860760424fffb9c5fc5)]
-  Merge pull request [#255](https://github.com/Tomas2D/ultravnc-repeater/issues/255) from Tomas2D/dependabot/npm_and_yarn/typescript-5.5.4 [[7b36d31](https://github.com/Tomas2D/ultravnc-repeater/commit/7b36d312994fdb71c3b45e6a958128d12754e7b0)]
-  Merge pull request [#256](https://github.com/Tomas2D/ultravnc-repeater/issues/256) from Tomas2D/dependabot/npm_and_yarn/types/node-18.19.42 [[e7b431f](https://github.com/Tomas2D/ultravnc-repeater/commit/e7b431f6681e9aaff71935484ae5d464db694b1f)]
-  Bump ts-jest from 29.2.2 to 29.2.3 [[63177c0](https://github.com/Tomas2D/ultravnc-repeater/commit/63177c073e073c928b6fe90168771e261d8027df)]
-  Bump typescript from 5.5.3 to 5.5.4 [[3eee533](https://github.com/Tomas2D/ultravnc-repeater/commit/3eee53349977c3e0ba8316cf77c297f81d66bea1)]
-  Bump @types/node from 18.19.40 to 18.19.42 [[bf7240d](https://github.com/Tomas2D/ultravnc-repeater/commit/bf7240d56702362263fdb6a64612e0cd2da2fdaa)]


<a name="1.5.3"></a>
## 1.5.3 (2024-07-24)

### Fixed

- 🐛 Update socket timeout [[d359c1b](https://github.com/Tomas2D/ultravnc-repeater/commit/d359c1bb94050d2ed5683af82b18922c57e09e26)]


<a name="1.5.2"></a>
## 1.5.2 (2024-07-23)

### Fixed

- 🐛 Force socket destroy [[a49bfe7](https://github.com/Tomas2D/ultravnc-repeater/commit/a49bfe758343f0d0162a234d9363aa2d2d884dd3)]


<a name="1.5.1"></a>
## 1.5.1 (2024-07-22)

### Fixed

- 🐛 Add missing socket destroy call [[479c068](https://github.com/Tomas2D/ultravnc-repeater/commit/479c068cabd8658f4050d79e700df081bdb7800b)]


<a name="1.5.0"></a>
## 1.5.0 (2024-07-20)

### Added

- ✨ Listen for timeouts [[0932609](https://github.com/Tomas2D/ultravnc-repeater/commit/093260960cd58ba38d577c9cd14e74f5da9ce229)]

### Miscellaneous

-  Merge pull request [#251](https://github.com/Tomas2D/ultravnc-repeater/issues/251) from Tomas2D/dependabot/npm_and_yarn/husky-9.1.1 [[991e99d](https://github.com/Tomas2D/ultravnc-repeater/commit/991e99d0ce34d2df73a6056107ad575f62158788)]
-  Bump husky from 9.0.11 to 9.1.1 [[addad58](https://github.com/Tomas2D/ultravnc-repeater/commit/addad5834f0961d5e624bdc41b845867680804a8)]
-  Merge pull request [#243](https://github.com/Tomas2D/ultravnc-repeater/issues/243) from Tomas2D/dependabot/npm_and_yarn/pino-9.3.1 [[0719136](https://github.com/Tomas2D/ultravnc-repeater/commit/07191367e99e75375fc96891a18e7f1165664e9a)]
-  Merge pull request [#245](https://github.com/Tomas2D/ultravnc-repeater/issues/245) from Tomas2D/dependabot/npm_and_yarn/types/node-18.19.40 [[c95c4bf](https://github.com/Tomas2D/ultravnc-repeater/commit/c95c4bf198bed5a7ee823cf4cccd7a7cbf858992)]
-  Bump @types/node from 18.19.39 to 18.19.40 [[0895f87](https://github.com/Tomas2D/ultravnc-repeater/commit/0895f87b56a5aeb2e594c7bbd76373a809d8fa80)]
-  Bump pino from 9.2.0 to 9.3.1 [[5e7e8d3](https://github.com/Tomas2D/ultravnc-repeater/commit/5e7e8d3500835286d80fcd1e6d58b0904f5bf7bf)]
-  Merge pull request [#241](https://github.com/Tomas2D/ultravnc-repeater/issues/241) from Tomas2D/dependabot/npm_and_yarn/prettier-3.3.3 [[20ed874](https://github.com/Tomas2D/ultravnc-repeater/commit/20ed8747b69c3da2cee4741adfe9c6fe5b741b00)]
-  Bump prettier from 3.3.2 to 3.3.3 [[a79a6c3](https://github.com/Tomas2D/ultravnc-repeater/commit/a79a6c33aa6d89a35efc92b2cae3c9a6fd3dcb0a)]
-  Merge pull request [#236](https://github.com/Tomas2D/ultravnc-repeater/issues/236) from Tomas2D/dependabot/npm_and_yarn/typescript-5.5.3 [[a656831](https://github.com/Tomas2D/ultravnc-repeater/commit/a6568318180a8013f3d4e8656dfe40e6d38e6663)]
-  Merge pull request [#240](https://github.com/Tomas2D/ultravnc-repeater/issues/240) from Tomas2D/dependabot/npm_and_yarn/ts-jest-29.2.2 [[bbe75a4](https://github.com/Tomas2D/ultravnc-repeater/commit/bbe75a4744d8a04229fb4e51e58a4028f82aafae)]
-  Bump ts-jest from 29.1.5 to 29.2.2 [[7bc72e6](https://github.com/Tomas2D/ultravnc-repeater/commit/7bc72e60b4928468a00b0de71a4277caa0ec4745)]
-  Merge pull request [#237](https://github.com/Tomas2D/ultravnc-repeater/issues/237) from Tomas2D/dependabot/npm_and_yarn/tsx-4.16.2 [[0d3a751](https://github.com/Tomas2D/ultravnc-repeater/commit/0d3a751ea39deebab7faa0f67af9f08610266186)]
-  Bump tsx from 4.15.7 to 4.16.2 [[1c6bd84](https://github.com/Tomas2D/ultravnc-repeater/commit/1c6bd84631e810e18d5d453d313a46930af11bbf)]
-  Bump typescript from 5.5.2 to 5.5.3 [[2dcd475](https://github.com/Tomas2D/ultravnc-repeater/commit/2dcd47523369f34f684b606cc0fe5f5222933e00)]
-  Merge pull request [#231](https://github.com/Tomas2D/ultravnc-repeater/issues/231) from Tomas2D/dependabot/npm_and_yarn/types/node-18.19.39 [[9ab9090](https://github.com/Tomas2D/ultravnc-repeater/commit/9ab9090dac5ef9d2dd8f99d4940af8a9d6f77c36)]
-  Merge pull request [#232](https://github.com/Tomas2D/ultravnc-repeater/issues/232) from Tomas2D/dependabot/npm_and_yarn/lint-staged-15.2.7 [[96c019d](https://github.com/Tomas2D/ultravnc-repeater/commit/96c019d52b46e2cdbfd1c1049c661482fd846347)]
-  Bump lint-staged from 15.2.6 to 15.2.7 [[90fe686](https://github.com/Tomas2D/ultravnc-repeater/commit/90fe686c7acadc0a751595ee38216d50c5cb69f0)]
-  Bump @types/node from 18.19.34 to 18.19.39 [[0065d52](https://github.com/Tomas2D/ultravnc-repeater/commit/0065d52f944e9ba8a4fe1361197ef32348837dad)]
-  Merge pull request [#225](https://github.com/Tomas2D/ultravnc-repeater/issues/225) from Tomas2D/dependabot/npm_and_yarn/prettier-3.3.2 [[0b00ed3](https://github.com/Tomas2D/ultravnc-repeater/commit/0b00ed32f028dae4c15d05eb622d257e9a6c89dc)]
-  Merge pull request [#226](https://github.com/Tomas2D/ultravnc-repeater/issues/226) from Tomas2D/dependabot/npm_and_yarn/ts-jest-29.1.5 [[d76c67d](https://github.com/Tomas2D/ultravnc-repeater/commit/d76c67de26a18192501952aef6f9ad2a27f09b22)]
-  Merge pull request [#229](https://github.com/Tomas2D/ultravnc-repeater/issues/229) from Tomas2D/dependabot/npm_and_yarn/typescript-5.5.2 [[d866b0e](https://github.com/Tomas2D/ultravnc-repeater/commit/d866b0ee046416b41779c10ea066bc9e617276a7)]
-  Merge pull request [#230](https://github.com/Tomas2D/ultravnc-repeater/issues/230) from Tomas2D/dependabot/npm_and_yarn/tsx-4.15.7 [[46a1c9b](https://github.com/Tomas2D/ultravnc-repeater/commit/46a1c9b9f0ea04bd3c95f6e2214cb1bc7dea3638)]
-  Bump tsx from 4.15.4 to 4.15.7 [[7c44519](https://github.com/Tomas2D/ultravnc-repeater/commit/7c44519876281c806d1ccd095c3ca80b84288152)]
-  Bump typescript from 5.4.3 to 5.5.2 [[6af0df7](https://github.com/Tomas2D/ultravnc-repeater/commit/6af0df72f315423be12798cede5adcf67b670b95)]
-  Bump ts-jest from 29.1.4 to 29.1.5 [[0fecd92](https://github.com/Tomas2D/ultravnc-repeater/commit/0fecd92705c23ddb5dce5be6c6c150fa300ddc93)]
-  Bump prettier from 3.3.1 to 3.3.2 [[973fec3](https://github.com/Tomas2D/ultravnc-repeater/commit/973fec3670f7ac97a975065876e90ad0b3016359)]
-  Merge pull request [#220](https://github.com/Tomas2D/ultravnc-repeater/issues/220) from Tomas2D/dependabot/npm_and_yarn/pino-9.2.0 [[81077f8](https://github.com/Tomas2D/ultravnc-repeater/commit/81077f8264c50be7f8a4d8f8b6abd76e29afd441)]
-  Merge pull request [#222](https://github.com/Tomas2D/ultravnc-repeater/issues/222) from Tomas2D/dependabot/npm_and_yarn/pino-pretty-11.2.1 [[f4a1c68](https://github.com/Tomas2D/ultravnc-repeater/commit/f4a1c68314b7fe6b6a13d59a3580c0c612ad7609)]
-  Merge pull request [#223](https://github.com/Tomas2D/ultravnc-repeater/issues/223) from Tomas2D/dependabot/npm_and_yarn/tsx-4.15.4 [[fc0ba92](https://github.com/Tomas2D/ultravnc-repeater/commit/fc0ba9207f4032768abfce63ae9f3e0e3f0a8b57)]
-  Bump tsx from 4.11.0 to 4.15.4 [[0d538d0](https://github.com/Tomas2D/ultravnc-repeater/commit/0d538d08cb8c886a61352a5fdcc967eb91a006a0)]
-  Bump pino-pretty from 11.2.0 to 11.2.1 [[f4899a1](https://github.com/Tomas2D/ultravnc-repeater/commit/f4899a1e863028d1e60f41b8b3d6e97600aa09e2)]
-  Merge pull request [#221](https://github.com/Tomas2D/ultravnc-repeater/issues/221) from Tomas2D/dependabot/npm_and_yarn/lint-staged-15.2.6 [[d279e88](https://github.com/Tomas2D/ultravnc-repeater/commit/d279e88234e726bb974500118845f809a1eb3cee)]
-  Bump lint-staged from 15.2.5 to 15.2.6 [[415d002](https://github.com/Tomas2D/ultravnc-repeater/commit/415d002066b32bb2bd78321e1459978e952f0560)]
-  Bump pino from 9.1.0 to 9.2.0 [[3f888c2](https://github.com/Tomas2D/ultravnc-repeater/commit/3f888c2447e5d732361be343961dc7970a54e6b9)]
-  Merge pull request [#209](https://github.com/Tomas2D/ultravnc-repeater/issues/209) from Tomas2D/dependabot/npm_and_yarn/ts-jest-29.1.4 [[294f5cf](https://github.com/Tomas2D/ultravnc-repeater/commit/294f5cfce3a68cec24e3d7417ba7104ff8907875)]
-  Merge pull request [#216](https://github.com/Tomas2D/ultravnc-repeater/issues/216) from Tomas2D/dependabot/npm_and_yarn/tsup-8.1.0 [[be05ec5](https://github.com/Tomas2D/ultravnc-repeater/commit/be05ec57913be0ce6bf3268712e9ac448e60f94e)]
-  Merge pull request [#217](https://github.com/Tomas2D/ultravnc-repeater/issues/217) from Tomas2D/dependabot/npm_and_yarn/pino-pretty-11.2.0 [[5d5dca5](https://github.com/Tomas2D/ultravnc-repeater/commit/5d5dca511e0f80582640e918ba9a437f6e5ad5ee)]
-  Bump pino-pretty from 11.0.0 to 11.2.0 [[071a648](https://github.com/Tomas2D/ultravnc-repeater/commit/071a648dabd72ef240b1b497584757159e5db3c2)]
-  Bump tsup from 8.0.2 to 8.1.0 [[7098593](https://github.com/Tomas2D/ultravnc-repeater/commit/709859367d19de7ccd4f5d2c61c1ce16665308e4)]
-  Merge pull request [#215](https://github.com/Tomas2D/ultravnc-repeater/issues/215) from Tomas2D/dependabot/npm_and_yarn/prettier-3.3.1 [[5eadcee](https://github.com/Tomas2D/ultravnc-repeater/commit/5eadcee63fe208ef30c9be4c8eff5fcc1cb5fb9c)]
-  Bump prettier from 3.2.5 to 3.3.1 [[29beb5e](https://github.com/Tomas2D/ultravnc-repeater/commit/29beb5e4a64c46473bbfbb60a50e083b230f1223)]
-  Merge pull request [#212](https://github.com/Tomas2D/ultravnc-repeater/issues/212) from Tomas2D/dependabot/npm_and_yarn/types/node-18.19.34 [[268f72c](https://github.com/Tomas2D/ultravnc-repeater/commit/268f72cf9882bc896788362af450525bff19a741)]
-  Bump @types/node from 18.19.33 to 18.19.34 [[063a154](https://github.com/Tomas2D/ultravnc-repeater/commit/063a154bba70d4ca9b4176e8965e1e18a1e29fe2)]
-  Merge pull request [#211](https://github.com/Tomas2D/ultravnc-repeater/issues/211) from Tomas2D/dependabot/npm_and_yarn/lint-staged-15.2.5 [[8618dbb](https://github.com/Tomas2D/ultravnc-repeater/commit/8618dbba40e44c894db268953f43cd44f6e1e1e9)]
-  Bump lint-staged from 15.2.2 to 15.2.5 [[51f5382](https://github.com/Tomas2D/ultravnc-repeater/commit/51f5382b0fcc8a3e48cf5bbc1420f3d7b36d62cf)]
-  Bump ts-jest from 29.1.2 to 29.1.4 [[a1ae3fd](https://github.com/Tomas2D/ultravnc-repeater/commit/a1ae3fdf08d5bb3e1cfb20f713363cc2f4b9931c)]
-  Merge pull request [#199](https://github.com/Tomas2D/ultravnc-repeater/issues/199) from Tomas2D/dependabot/npm_and_yarn/types/node-18.19.33 [[88530ab](https://github.com/Tomas2D/ultravnc-repeater/commit/88530ab3cfc911d488cefac583cb14b77f0b3e76)]
-  Merge pull request [#201](https://github.com/Tomas2D/ultravnc-repeater/issues/201) from Tomas2D/dependabot/npm_and_yarn/pino-9.1.0 [[cf02ec1](https://github.com/Tomas2D/ultravnc-repeater/commit/cf02ec140519d6c018f95582c15c2309531cc9b3)]
-  Merge pull request [#207](https://github.com/Tomas2D/ultravnc-repeater/issues/207) from Tomas2D/dependabot/npm_and_yarn/tsx-4.11.0 [[a09a378](https://github.com/Tomas2D/ultravnc-repeater/commit/a09a3786085dd0de3f706a4e76c8b72d7e1090a7)]
-  Bump tsx from 4.10.3 to 4.11.0 [[3bb0aec](https://github.com/Tomas2D/ultravnc-repeater/commit/3bb0aec0dc6695bd9fe04602e5445e47c61156b7)]
-  Bump @types/node from 18.19.28 to 18.19.33 [[1809b7b](https://github.com/Tomas2D/ultravnc-repeater/commit/1809b7be881d700c02bde567a68918ad4b7d8858)]
-  Bump pino from 9.0.0 to 9.1.0 [[9201381](https://github.com/Tomas2D/ultravnc-repeater/commit/92013811fb3b0f5df95eb8fd9a775816209b5da5)]


<a name="1.4.6"></a>
## 1.4.6 (2024-05-22)

### Fixed

- 🐛 Improve memory handling [[e02b91e](https://github.com/Tomas2D/ultravnc-repeater/commit/e02b91ee632455e34b6705c3f89b12dc1b9baa61)]

### Miscellaneous

-  Merge pull request [#204](https://github.com/Tomas2D/ultravnc-repeater/issues/204) from Tomas2D/dependabot/npm_and_yarn/tsx-4.10.3 [[b0e7c4b](https://github.com/Tomas2D/ultravnc-repeater/commit/b0e7c4b0bcd1e175896e1616718a0921118042ff)]
-  Bump tsx from 4.10.1 to 4.10.3 [[7618390](https://github.com/Tomas2D/ultravnc-repeater/commit/76183904b561f22b7426f5e5e622f4242fe859f5)]
-  Merge pull request [#200](https://github.com/Tomas2D/ultravnc-repeater/issues/200) from Tomas2D/dependabot/npm_and_yarn/tsx-4.10.1 [[2f7e098](https://github.com/Tomas2D/ultravnc-repeater/commit/2f7e0985d6f6db7bdf0672b4247e99aab58edabf)]
-  Bump tsx from 4.8.2 to 4.10.1 [[ab9fa55](https://github.com/Tomas2D/ultravnc-repeater/commit/ab9fa55fd05a0a304d4831fb80b07dfd4fbd1ce1)]


<a name="1.4.5"></a>
## 1.4.5 (2024-05-11)

### Added

- ✨ Update events registration [[0356061](https://github.com/Tomas2D/ultravnc-repeater/commit/03560614bc7dfc68bc627053d58a89031e1f6518)]

### Fixed

- 🐛 Terminate socket reading on timeout [[eac5d0e](https://github.com/Tomas2D/ultravnc-repeater/commit/eac5d0e09856ddcbfd47b252dc18f0a694e00cc8)]

### Miscellaneous

-  1.4.3 [[873acdf](https://github.com/Tomas2D/ultravnc-repeater/commit/873acdf7301be0473e5909191d63a047282b6e87)]
-  Bump tsx from 4.7.3 to 4.8.2 [[04a629a](https://github.com/Tomas2D/ultravnc-repeater/commit/04a629aae638c5b48d5befa38f8aa8af6f7025a8)]
-  Merge pull request [#192](https://github.com/Tomas2D/ultravnc-repeater/issues/192) from Tomas2D/dependabot/npm_and_yarn/pino-9.0.0 [[ae63352](https://github.com/Tomas2D/ultravnc-repeater/commit/ae633522065deb97cbbe4e33dc81dd1ac1f59298)]
-  Merge pull request [#193](https://github.com/Tomas2D/ultravnc-repeater/issues/193) from Tomas2D/dependabot/npm_and_yarn/tsx-4.7.3 [[005c435](https://github.com/Tomas2D/ultravnc-repeater/commit/005c435e35b883e7b50731de31e7b8c52bd12a97)]
-  Bump tsx from 4.7.2 to 4.7.3 [[0249a11](https://github.com/Tomas2D/ultravnc-repeater/commit/0249a110842b66c0cb7651ea427e944012e8a62a)]
-  Bump pino from 8.20.0 to 9.0.0 [[44070c5](https://github.com/Tomas2D/ultravnc-repeater/commit/44070c57e7a314c0c25deb446ccf47c15ae06467)]
-  Merge pull request [#183](https://github.com/Tomas2D/ultravnc-repeater/issues/183) from Tomas2D/dependabot/npm_and_yarn/pino-8.20.0 [[bdabe21](https://github.com/Tomas2D/ultravnc-repeater/commit/bdabe21a385851988a0eb06e5e322a301c8e5717)]
-  Merge pull request [#190](https://github.com/Tomas2D/ultravnc-repeater/issues/190) from Tomas2D/dependabot/npm_and_yarn/net-keepalive-4.0.1 [[e2ab8c6](https://github.com/Tomas2D/ultravnc-repeater/commit/e2ab8c612d71a79a661b285d6baea9300fd3575f)]
-  Bump pino from 8.19.0 to 8.20.0 [[9c93508](https://github.com/Tomas2D/ultravnc-repeater/commit/9c93508c33169dc5b8e09f9023898376904a81a1)]
-  Bump net-keepalive from 3.0.1 to 4.0.1 [[3feb11a](https://github.com/Tomas2D/ultravnc-repeater/commit/3feb11acd58c2c50283582b40812131c5977a763)]
-  Merge pull request [#182](https://github.com/Tomas2D/ultravnc-repeater/issues/182) from Tomas2D/dependabot/npm_and_yarn/tsx-4.7.2 [[31b7dbe](https://github.com/Tomas2D/ultravnc-repeater/commit/31b7dbe44037da7b877060785031cc0d8ae8114a)]
-  Bump tsx from 4.7.1 to 4.7.2 [[4e489a5](https://github.com/Tomas2D/ultravnc-repeater/commit/4e489a5cc2bf68fca2b9632529c021d1aec568ba)]
-  Merge pull request [#178](https://github.com/Tomas2D/ultravnc-repeater/issues/178) from Tomas2D/dependabot/npm_and_yarn/types/node-18.19.28 [[b8371ad](https://github.com/Tomas2D/ultravnc-repeater/commit/b8371ad87509347b5fd30fc3050e7679a710e567)]
-  Bump @types/node from 18.19.26 to 18.19.28 [[56730df](https://github.com/Tomas2D/ultravnc-repeater/commit/56730df1d7e04e4705e115ac676350a4ed59c9e1)]
-  Merge pull request [#175](https://github.com/Tomas2D/ultravnc-repeater/issues/175) from Tomas2D/dependabot/npm_and_yarn/pino-pretty-11.0.0 [[a0fb202](https://github.com/Tomas2D/ultravnc-repeater/commit/a0fb2022d243203f2f69c478292e9bab3f9a7d4b)]
-  Merge pull request [#176](https://github.com/Tomas2D/ultravnc-repeater/issues/176) from Tomas2D/dependabot/npm_and_yarn/typescript-5.4.3 [[18c071b](https://github.com/Tomas2D/ultravnc-repeater/commit/18c071b9b66653b2a433067d67d4974271f05f15)]
-  Bump typescript from 5.4.2 to 5.4.3 [[4698211](https://github.com/Tomas2D/ultravnc-repeater/commit/46982110a096de5104e6872c652e2722d925882b)]
-  Bump pino-pretty from 10.3.1 to 11.0.0 [[e89ee1b](https://github.com/Tomas2D/ultravnc-repeater/commit/e89ee1b939d710b1590ff0bee38f7b57601e0663)]
-  Merge pull request [#174](https://github.com/Tomas2D/ultravnc-repeater/issues/174) from Tomas2D/dependabot/npm_and_yarn/types/node-18.19.26 [[f7dbcf3](https://github.com/Tomas2D/ultravnc-repeater/commit/f7dbcf346a8b2f026379238bb36997ac486b2d6e)]
-  Bump @types/node from 18.19.24 to 18.19.26 [[142c1d0](https://github.com/Tomas2D/ultravnc-repeater/commit/142c1d05820da3b0f89f36083e04e873934adb6f)]


<a name="1.4.1"></a>
## 1.4.1 (2024-03-14)

### Miscellaneous

-  Upgrade dependencies


<a name="1.4.0"></a>
## 1.4.0 (2023-12-12)

### Added

- ✨ Add refuseDirectHookup option [[e3c088c](https://github.com/Tomas2D/ultravnc-repeater/commit/e3c088c267790cf437204321b1487c241a127722)]

### Fixed

- 🐛 Remove closed client connection from pending connections [[ec7459c](https://github.com/Tomas2D/ultravnc-repeater/commit/ec7459c0a5e1bedc86cc64cb990ce0af92c8e0ee)]
- 🐛 Prevents registering closed/errored sockets [[d19b8b9](https://github.com/Tomas2D/ultravnc-repeater/commit/d19b8b9393dcc37345d4f40a6f1617b3e3e74315)]


<a name="1.3.0"></a>
## 1.3.0 (2023-12-01)

### Added

- ✨ Add TCP Keep-Alive support, statistics and improve events
- ✨ Add optional hostname option
- ✨ Update types and accessors
- ✨ Improve sockets handling


<a name="1.2.0"></a>
## 1.2.0 (2023-09-24)

### Added

- ✨ Improve logging [[46d7c55](https://github.com/Tomas2D/ultravnc-repeater/commit/46d7c55a3ca3324fa4dd5ea0e9b860df3e4b32c9)]
- ✨ Improve logging, types and connections handling [[6fe5dd8](https://github.com/Tomas2D/ultravnc-repeater/commit/6fe5dd8f621207bd8df2e79f4f2023a3e13ca6f9)]
- ✨ Improve connections handling, update logs [[34078f9](https://github.com/Tomas2D/ultravnc-repeater/commit/34078f9a1b8bad4b8c88bd3188652bf5b101efbb)]


### Changed

- 💬 Update README [[ab8a66f](https://github.com/Tomas2D/ultravnc-repeater/commit/ab8a66f9ae9f5c64929bdb42b040777dc649a6d4)]


<a name="1.1.0"></a>
## 1.1.0 (2023-09-18)

### Added

- ✨ Add missing keep-alive config options [[4bd02d3](https://github.com/Tomas2D/ultravnc-repeater/commit/4bd02d373a914c2cb2cef5a0180a14ce2aa0e5dc)]


<a name="1.0.0"></a>
## 1.0.0 (2023-09-17)

### Added

- 🎉 Initial version


