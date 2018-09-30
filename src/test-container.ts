import { asClass, asFunction, asValue, createContainer, InjectionMode, Lifetime } from 'awilix'
import * as sinon from 'sinon'

import { registrations } from 'container'

const container = createContainer({ injectionMode: InjectionMode.CLASSIC })
container.register(registrations)

const uuid = sinon.fake.returns('uuid')
container.register('uuid', asValue(uuid))

export default container
